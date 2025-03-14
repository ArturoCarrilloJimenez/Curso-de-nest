import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';

@Injectable()
export class BrandService {
  private brands: Brand[] = [
    {
      id: uuidv4(),
      name: 'Honda',
      createAt: new Date(),
      updateAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Toyota',
      createAt: new Date(),
      updateAt: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Citroen',
      createAt: new Date(),
      updateAt: new Date(),
    },
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuidv4(),
      name: createBrandDto.name,
      createAt: new Date(),
      updateAt: new Date(),
    };

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: UUID) {
    const brand = this.brands.find((brand) => brand.id == id);

    if (!brand) throw new NotFoundException(`Brand with id ${id} not exist`);

    return brand;
  }

  update(id: UUID, updateBrandDto: UpdateBrandDto) {
    const brand = this.findOne(id);

    brand.name = updateBrandDto.name;

    return brand;
  }

  remove(id: UUID) {
    this.findOne(id);

    this.brands = this.brands.filter((brand) => brand.id !== id);

    return this.brands;
  }
}
