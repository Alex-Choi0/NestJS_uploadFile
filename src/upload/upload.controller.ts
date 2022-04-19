// /src/upload/upload.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Upload Files To Server')
@Controller('upload')
export class UploadController {
  constructor() {}

  @Post('sendToServer')
  @ApiOperation({ summary: '파일을 서버쪽으로 upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads', // 서버에 uploads폴더를 자동 생성(이안에 다운 받은 파일이 저장)
    }),
  )
  downloadFile(@UploadedFile('file') file) {
    return file;
  }
}
