import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './configs/app.configs';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(
      // La db se encuentra en Mongo Atlas alojado de forma gratuita
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@pruebas-nest.js903.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGODB_APPNAME}`,
    ),

    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
