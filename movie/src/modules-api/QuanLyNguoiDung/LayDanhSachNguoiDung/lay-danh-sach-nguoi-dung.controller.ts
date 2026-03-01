import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LayDanhSachNguoiDungService } from './lay-danh-sach-nguoi-dung.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('QuanLyNguoiDung')
@UseGuards(RolesGuard)
export class LayDanhSachNguoiDungController {
  constructor(
    private readonly layDanhSachNguoiDungService: LayDanhSachNguoiDungService,
  ) {}

  @Get('LayDanhSachNguoiDung')
  @Roles('admin') // Chỉ admin mới được truy cập
  async layDanhSachNguoiDung(@Query('tuKhoa') tuKhoa?: string) {
    return await this.layDanhSachNguoiDungService.layDanhSachNguoiDung(tuKhoa);
  }
}
