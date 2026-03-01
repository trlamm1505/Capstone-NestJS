import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ThemPhimService } from './them-phim.service';
import { ThemPhimDto } from './dto/them-phim.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('QuanLyPhim')
@UseGuards(RolesGuard)
export class ThemPhimController {
  constructor(private readonly themPhimService: ThemPhimService) {}

  @Post('ThemPhim')
  @Roles('admin')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'hinhAnh', maxCount: 1 },
        { name: 'trailer', maxCount: 1 },
      ],
      { limits: { fileSize: 50 * 1024 * 1024 } },
    ),
  )
  async themPhim(
    @Body() body: ThemPhimDto,
    @UploadedFiles() files?: any,
  ) {
    return await this.themPhimService.themPhim(body, files);
  }
}
