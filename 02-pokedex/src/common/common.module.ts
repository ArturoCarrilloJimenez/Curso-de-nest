import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
  imports: [],
  providers: [AxiosAdapter],
  controllers: [],
  exports: [AxiosAdapter],
})
export class CommonModule {}
