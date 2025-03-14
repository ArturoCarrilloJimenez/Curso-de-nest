import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { BrandModule } from './brand/brand.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [CarsModule, BrandModule, SeedModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
