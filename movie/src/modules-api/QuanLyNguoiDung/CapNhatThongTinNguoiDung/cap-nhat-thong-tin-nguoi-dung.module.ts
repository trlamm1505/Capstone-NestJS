import { Module } from '@nestjs/common';
import { CapNhatThongTinNguoiDungController } from './cap-nhat-thong-tin-nguoi-dung.controller';
import { CapNhatThongTinNguoiDungService } from './cap-nhat-thong-tin-nguoi-dung.service';

@Module({
  controllers: [CapNhatThongTinNguoiDungController],
  providers: [CapNhatThongTinNguoiDungService],
  exports: [CapNhatThongTinNguoiDungService],
})
export class CapNhatThongTinNguoiDungModule {}
