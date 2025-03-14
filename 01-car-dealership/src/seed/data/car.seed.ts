import { Car } from 'src/cars/interface/car.interface';
import { v4 as uuidv4 } from 'uuid';

export const CARS_SEED: Car[] = [
  {
    id: uuidv4(),
    brand: 'Honda',
    model: 'Civic',
  },
  {
    id: uuidv4(),
    brand: 'Toyota',
    model: 'Carola',
  },
  {
    id: uuidv4(),
    brand: 'Jeep',
    model: 'Cherokee',
  },
];
