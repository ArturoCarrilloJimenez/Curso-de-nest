import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateDto } from 'src/common/dto/paginate.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll(@Query() paginateDto: PaginateDto) {
    const { limit = 10, offset = 0 } = paginateDto;

    return this.pokemonModel.find().limit(limit).skip(offset);
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;

    // Is no
    if (!isNaN(+term)) pokemon = await this.pokemonModel.findOne({ no: term });

    // Is id
    if (isValidObjectId(term)) pokemon = await this.pokemonModel.findById(term);

    // Is name
    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon whit id, name or no ${term} not found`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    let pokemon: Pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      pokemon = await pokemon.updateOne(updatePokemonDto, { new: true });

      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    // Con deleteOne obtienes varias variables como el numero de celdas relimadas entre otras
    // De esta forma es posible validar el borrado en una sola consulta
    const { deletedCount } = await this.pokemonModel.deleteOne({
      _id: id,
    });

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon whit id ${id} not find`);

    return;
  }

  private handleException(error) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon ${error.keyValue.name ? error.keyValue.name : 'whit no ' + error.keyValue.no} already exist`,
      );
    }

    console.log(error);

    throw new InternalServerErrorException(
      `Cont't by create or update Pokemon - Check server log`,
    );
  }
}
