import { Controller, Get, Query } from '@nestjs/common';
import { LayThongTinLichChieuPhimService } from './lay-thong-tin-lich-chieu-phim.service';

@Controller('QuanLyRap')
export class LayThongTinLichChieuPhimController {
  constructor(
    private readonly layThongTinLichChieuPhimService: LayThongTinLichChieuPhimService,
  ) {}

  @Get('LayThongTinLichChieuPhim')
  async layThongTinLichChieuPhim(@Query('maPhim') maPhim?: string) {
    return await this.layThongTinLichChieuPhimService.layThongTinLichChieuPhim(maPhim);
  }
}
