import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { UUID } from 'crypto';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.getCars();
  }

  @Get(':id')
  getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: UUID) {
    return this.carsService.getCarById(id);
  }

  @Post()
  setOneCar(@Body() car: CreateCarDto) {
    return this.carsService.save(car);
  }

  @Put()
  putOneCar(@Body() car: UpdateCarDto) {
    return this.carsService.update(car);
  }

  @Delete(':id')
  deleteOneCar(@Param('id', new ParseUUIDPipe({ version: '4' })) id: UUID) {
    return this.carsService.delete(id);
  }
}
