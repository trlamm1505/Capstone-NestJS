import { Module } from '@nestjs/common';
import { LayDanhSachLoaiNguoiDungController } from './lay-danh-sach-loai-nguoi-dung.controller';
import { LayDanhSachLoaiNguoiDungService } from './lay-danh-sach-loai-nguoi-dung.service';

@Module({
  controllers: [LayDanhSachLoaiNguoiDungController],
  providers: [LayDanhSachLoaiNguoiDungService],
  exports: [LayDanhSachLoaiNguoiDungService],
})
export class LayDanhSachLoaiNguoiDungModule {}
