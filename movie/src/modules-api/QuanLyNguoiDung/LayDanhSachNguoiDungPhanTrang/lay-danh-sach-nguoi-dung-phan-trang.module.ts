import { Module } from '@nestjs/common';
import { LayDanhSachNguoiDungPhanTrangController } from './lay-danh-sach-nguoi-dung-phan-trang.controller';
import { LayDanhSachNguoiDungPhanTrangService } from './lay-danh-sach-nguoi-dung-phan-trang.service';

@Module({
  controllers: [LayDanhSachNguoiDungPhanTrangController],
  providers: [LayDanhSachNguoiDungPhanTrangService],
  exports: [LayDanhSachNguoiDungPhanTrangService],
})
export class LayDanhSachNguoiDungPhanTrangModule {}
