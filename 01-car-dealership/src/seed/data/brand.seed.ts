import { Brand } from 'src/brand/entities/brand.entity';
import { v4 as uuidv4 } from 'uuid';

export const BRANDS_SEED: Brand[] = [
  {
    id: uuidv4(),
    name: 'Honda',
    createAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Toyota',
    createAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Citroen',
    createAt: new Date(),
    updateAt: new Date(),
  },
];
