import { Module } from '@nestjs/common';
import { LayDanhSachNguoiDungController } from './lay-danh-sach-nguoi-dung.controller';
import { LayDanhSachNguoiDungService } from './lay-danh-sach-nguoi-dung.service';

@Module({
  controllers: [LayDanhSachNguoiDungController],
  providers: [LayDanhSachNguoiDungService],
  exports: [LayDanhSachNguoiDungService],
})
export class LayDanhSachNguoiDungModule {}
