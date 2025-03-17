import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PokemomSchema, Pokemon } from './entities/pokemon.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemomSchema }]),
  ],
})
export class PokemonModule {}
