import { Controller, Get, Query } from '@nestjs/common';
import { LayDanhSachPhongVeService } from './lay-danh-sach-phong-ve.service';

@Controller('QuanLyDatVe')
export class LayDanhSachPhongVeController {
  constructor(
    private readonly layDanhSachPhongVeService: LayDanhSachPhongVeService,
  ) {}

  @Get('LayDanhSachPhongVe')
  async layDanhSachPhongVe(@Query('maLichChieu') maLichChieu: string) {
    return await this.layDanhSachPhongVeService.layDanhSachPhongVe(maLichChieu);
  }
}
