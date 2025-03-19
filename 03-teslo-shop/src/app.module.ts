import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';

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
      entities: [Product],
      synchronize: true,
    }),

    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
