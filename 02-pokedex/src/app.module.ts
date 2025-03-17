import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(
      // La db se encuentra en Mongo Atlas alojado de forma gratuita
      `mongodb+srv://acarrilloj05:PruebasNest123@pruebas-nest.js903.mongodb.net/?retryWrites=true&w=majority&appName=Pruebas-Nest`,
    ),

    PokemonModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
