import { Controller, Delete, Query, UseGuards } from '@nestjs/common';
import { XoaPhimService } from './xoa-phim.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('QuanLyPhim')
@UseGuards(RolesGuard)
export class XoaPhimController {
  constructor(private readonly xoaPhimService: XoaPhimService) {}

  @Delete('XoaPhim')
  @Roles('admin')
  async xoaPhim(@Query('maPhim') maPhim: string) {
    return await this.xoaPhimService.xoaPhim(maPhim);
  }
}
