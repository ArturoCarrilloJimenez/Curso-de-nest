import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginateDto } from 'src/commons/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginateDto: PaginateDto) {
    const { limit = 10, offset = 0 } = paginateDto;

    return this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let product: Product | null;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();

      term = term.toLowerCase();

      product = await queryBuilder
        .where('LOWER (title) =:title or slug =:slug', {
          title: term,
          slug: term,
        })
        .getOne();
    }

    if (!product) throw new NotFoundException('This product not found');

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product)
      throw new NotFoundException(`Product whit id ${id} not found`);

    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const product: Product | undefined = await this.findOne(id);

    if (!product) return;

    this.productRepository.remove(product);

    return product;
  }

  private handleExceptions(error) {
    this.logger.error(error);

    if (error.code == 23505) throw new BadRequestException(error.detail);
    if (error.code == '22P02')
      throw new BadRequestException('Invalid format of UUID');

    throw new InternalServerErrorException('Erro - not found create product');
  }
}
