import { Controller, Post, Query } from '@nestjs/common';
import { LayThongTinNguoiDungService } from './lay-thong-tin-nguoi-dung.service';

@Controller('QuanLyNguoiDung')
export class LayThongTinNguoiDungController {
  constructor(
    private readonly layThongTinNguoiDungService: LayThongTinNguoiDungService,
  ) {}

  @Post('LayThongTinNguoiDung')
  async layThongTinNguoiDung(@Query('taiKhoan') taiKhoan: string) {
    return await this.layThongTinNguoiDungService.layThongTinNguoiDung(
      taiKhoan,
    );
  }
}
