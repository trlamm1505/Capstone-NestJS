import { Module } from '@nestjs/common';
import { TimKiemNguoiDungController } from './tim-kiem-nguoi-dung.controller';
import { TimKiemNguoiDungService } from './tim-kiem-nguoi-dung.service';

@Module({
  controllers: [TimKiemNguoiDungController],
  providers: [TimKiemNguoiDungService],
  exports: [TimKiemNguoiDungService],
})
export class TimKiemNguoiDungModule {}
