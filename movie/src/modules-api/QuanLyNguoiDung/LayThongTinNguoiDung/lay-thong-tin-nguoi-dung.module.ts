import { Module } from '@nestjs/common';
import { LayThongTinNguoiDungController } from './lay-thong-tin-nguoi-dung.controller';
import { LayThongTinNguoiDungService } from './lay-thong-tin-nguoi-dung.service';

@Module({
  controllers: [LayThongTinNguoiDungController],
  providers: [LayThongTinNguoiDungService],
  exports: [LayThongTinNguoiDungService],
})
export class LayThongTinNguoiDungModule {}
