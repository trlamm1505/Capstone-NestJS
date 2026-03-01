import {
  Body,
  Controller,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CapNhatPhimService } from './cap-nhat-phim.service';
import { CapNhatPhimDto } from './dto/cap-nhat-phim.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('QuanLyPhim')
@UseGuards(RolesGuard)
export class CapNhatPhimController {
  constructor(private readonly capNhatPhimService: CapNhatPhimService) {}

  @Put('CapNhatPhim')
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
  async capNhatPhim(
    @Body() body: CapNhatPhimDto,
    @UploadedFiles() files?: any,
  ) {
    return await this.capNhatPhimService.capNhatPhim(body, files);
  }
}
