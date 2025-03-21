import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './products/products.module';

import { Product } from './products/entities/product.entity';
import { ProductImage } from './products/entities/product.image.entity';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      ssl: {
        rejectUnauthorized: false, // Clever Cloud suele requerir SSL
      },
      // Exporto con una expresión los entities para ahorrarme el tiempo de configurar uno a uno a mano
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    ProductsModule,

    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
