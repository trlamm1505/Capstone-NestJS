import { Controller, Get, Query } from '@nestjs/common';
import { LayDanhSachPhimPhanTrangService } from './lay-danh-sach-phim-phan-trang.service';

@Controller('QuanLyPhim')
export class LayDanhSachPhimPhanTrangController {
  constructor(
    private readonly layDanhSachPhimPhanTrangService: LayDanhSachPhimPhanTrangService,
  ) {}

  @Get('LayDanhSachPhimPhanTrang')
  async layDanhSachPhimPhanTrang(
    @Query('tenPhim') tenPhim?: string,
    @Query('soTrang') soTrang?: string,
    @Query('soPhanTuTrenTrang') soPhanTuTrenTrang?: string,
  ) {
    return await this.layDanhSachPhimPhanTrangService.layDanhSachPhimPhanTrang(
      tenPhim,
      soTrang,
      soPhanTuTrenTrang,
    );
  }
}
