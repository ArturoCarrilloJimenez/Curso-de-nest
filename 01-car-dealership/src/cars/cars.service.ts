import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interface/car.interface';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  getCars() {
    return this.cars;
  }

  getCarById(id: UUID) {
    const car = this.cars.find((car) => car.id == id);

    if (!car) throw new NotFoundException(`Car with id ${id} not exist`);

    return car;
  }

  save(car: CreateCarDto) {
    const newCar: Car = { id: uuidv4(), ...car };
    this.cars.push(newCar);
    return newCar;
  }

  update(car: UpdateCarDto) {
    const getCar = this.getCarById(car.id);

    if (car.brand) getCar.brand = car.brand;
    if (car.model) getCar.model = car.model;

    return getCar;
  }

  delete(id: UUID) {
    this.getCarById(id);

    this.cars = this.cars.filter((car) => car.id !== id);

    return this.cars;
  }

  fillBrandsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
