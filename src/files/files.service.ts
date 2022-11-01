import { Injectable } from '@nestjs/common';

type FileResponseType = {
  uri: string;
};

@Injectable()
export class FilesService {
  async create(file): Promise<FileResponseType> {
    return { uri: file.filename };
  }
}
