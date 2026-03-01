import { Module } from '@nestjs/common';
import { TimKiemNguoiDungPhanTrangController } from './tim-kiem-nguoi-dung-phan-trang.controller';
import { TimKiemNguoiDungPhanTrangService } from './tim-kiem-nguoi-dung-phan-trang.service';

@Module({
  controllers: [TimKiemNguoiDungPhanTrangController],
  providers: [TimKiemNguoiDungPhanTrangService],
  exports: [TimKiemNguoiDungPhanTrangService],
})
export class TimKiemNguoiDungPhanTrangModule {}
