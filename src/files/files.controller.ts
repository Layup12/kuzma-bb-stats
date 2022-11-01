import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as uuid from 'uuid';

import { FilesService } from './files.service';

export const storage = {
  storage: diskStorage({
    destination: path.resolve(__dirname, '..', 'static'),
    filename: (_, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuid.v4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('Файлы')
@Controller('files')
export class FilesController {
  constructor(private teamService: FilesService) {}

  @ApiOperation({ summary: 'Создание файла' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  create(@UploadedFile() file) {
    return this.teamService.create(file);
  }
}
