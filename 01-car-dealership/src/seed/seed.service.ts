import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/car.seed';
import { BRANDS_SEED } from './data/brand.seed';

@Injectable()
export class SeedService {
  carsSeed() {
    return CARS_SEED;
  }

  brandsSeed() {
    return BRANDS_SEED;
  }
}
