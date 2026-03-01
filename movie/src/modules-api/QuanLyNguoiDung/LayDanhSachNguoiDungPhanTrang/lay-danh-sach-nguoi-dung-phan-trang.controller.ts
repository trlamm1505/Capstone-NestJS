import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LayDanhSachNguoiDungPhanTrangService } from './lay-danh-sach-nguoi-dung-phan-trang.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('QuanLyNguoiDung')
@UseGuards(RolesGuard)
export class LayDanhSachNguoiDungPhanTrangController {
  constructor(
    private readonly layDanhSachNguoiDungPhanTrangService: LayDanhSachNguoiDungPhanTrangService,
  ) {}

  @Get('LayDanhSachNguoiDungPhanTrang')
  @Roles('admin') // Chỉ admin mới được truy cập
  async layDanhSachNguoiDungPhanTrang(
    @Query('tuKhoa') tuKhoa?: string,
    @Query('soTrang') soTrang?: string,
    @Query('soPhanTuTrenTrang') soPhanTuTrenTrang?: string,
  ) {
    return await this.layDanhSachNguoiDungPhanTrangService.layDanhSachNguoiDungPhanTrang(
      tuKhoa,
      soTrang,
      soPhanTuTrenTrang,
    );
  }
}



