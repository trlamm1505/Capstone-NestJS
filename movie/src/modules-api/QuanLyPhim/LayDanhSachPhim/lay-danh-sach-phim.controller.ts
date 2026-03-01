import { Controller, Get, Query } from '@nestjs/common';
import { LayDanhSachPhimService } from './lay-danh-sach-phim.service';

@Controller('QuanLyPhim')
export class LayDanhSachPhimController {
  constructor(private readonly layDanhSachPhimService: LayDanhSachPhimService) {}

  @Get('LayDanhSachPhim')
  async layDanhSachPhim(@Query('tenPhim') tenPhim?: string) {
    return await this.layDanhSachPhimService.layDanhSachPhim(tenPhim);
  }
}
