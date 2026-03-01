import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TimKiemNguoiDungPhanTrangService } from './tim-kiem-nguoi-dung-phan-trang.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('QuanLyNguoiDung')
@UseGuards(RolesGuard)
export class TimKiemNguoiDungPhanTrangController {
  constructor(
    private readonly timKiemNguoiDungPhanTrangService: TimKiemNguoiDungPhanTrangService,
  ) {}

  @Get('TimKiemNguoiDungPhanTrang')
  @Roles('admin') // Chỉ admin mới được truy cập
  async timKiemNguoiDungPhanTrang(
    @Query('tuKhoa') tuKhoa?: string,
    @Query('soTrang') soTrang?: string,
    @Query('soPhanTuTrenTrang') soPhanTuTrenTrang?: string,
  ) {
    return await this.timKiemNguoiDungPhanTrangService.timKiemNguoiDungPhanTrang(
      tuKhoa,
      soTrang,
      soPhanTuTrenTrang,
    );
  }
}
