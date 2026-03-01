import { Controller, Get, Query } from '@nestjs/common';
import { LayThongTinPhimService } from './lay-thong-tin-phim.service';

@Controller('QuanLyPhim')
export class LayThongTinPhimController {
  constructor(private readonly layThongTinPhimService: LayThongTinPhimService) {}

  @Get('LayThongTinPhim')
  async layThongTinPhim(@Query('maPhim') maPhim?: string) {
    return await this.layThongTinPhimService.layThongTinPhim(maPhim);
  }
}
