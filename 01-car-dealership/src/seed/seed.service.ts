import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/car.seed';
import { BRANDS_SEED } from './data/brand.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandService } from 'src/brand/brand.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandService,
  ) {}

  populateDB() {
    this.carsService.fillBrandsWithSeedData(CARS_SEED);
    this.brandsService.fillBrandsWithSeedData(BRANDS_SEED);

    return 'Seed Execute';
  }
}
