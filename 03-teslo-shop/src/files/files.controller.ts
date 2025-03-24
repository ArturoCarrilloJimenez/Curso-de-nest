import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { DirNameFile } from './interfaces/fileType.interface';
import { DirNameFilePipe } from './pipes/dir-name-file/dir-name-file.pipe';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':type/:fileName')
  findProductImage(
    @Param('type', DirNameFilePipe) type: DirNameFile,
    @Param('fileName') fileName: string,
  ) {
    return this.filesService.getStaticFile(type, fileName);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  ) // Interceptor
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File, // Si usas de base Express este es el tipo file
  ) {
    if (!file) throw new BadRequestException('file is missing');

    return {
      secureUrl: `http://localhost:3000/api/v1/files/product/${file.filename}`,
    };
  }
}
