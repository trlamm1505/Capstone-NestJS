import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TimKiemNguoiDungService } from './tim-kiem-nguoi-dung.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('QuanLyNguoiDung')
@UseGuards(RolesGuard)
export class TimKiemNguoiDungController {
  constructor(
    private readonly timKiemNguoiDungService: TimKiemNguoiDungService,
  ) {}

  @Get('TimKiemNguoiDung')
  @Roles('admin') // Chỉ admin mới được truy cập
  async timKiemNguoiDung(@Query('tuKhoa') tuKhoa?: string) {
    return await this.timKiemNguoiDungService.timKiemNguoiDung(tuKhoa);
  }
}
