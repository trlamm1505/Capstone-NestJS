import { Controller, Get } from '@nestjs/common';
import { LayDanhSachLoaiNguoiDungService } from './lay-danh-sach-loai-nguoi-dung.service';

@Controller('QuanLyNguoiDung')
export class LayDanhSachLoaiNguoiDungController {
  constructor(
    private readonly layDanhSachLoaiNguoiDungService: LayDanhSachLoaiNguoiDungService,
  ) {}

  @Get('LayDanhSachLoaiNguoiDung')
  async layDanhSachLoaiNguoiDung() {
    return await this.layDanhSachLoaiNguoiDungService.layDanhSachLoaiNguoiDung();
  }
}
