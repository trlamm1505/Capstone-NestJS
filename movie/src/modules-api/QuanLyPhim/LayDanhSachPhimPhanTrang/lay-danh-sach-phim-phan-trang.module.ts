import { Module } from '@nestjs/common';
import { LayDanhSachPhimPhanTrangController } from './lay-danh-sach-phim-phan-trang.controller';
import { LayDanhSachPhimPhanTrangService } from './lay-danh-sach-phim-phan-trang.service';

@Module({
  controllers: [LayDanhSachPhimPhanTrangController],
  providers: [LayDanhSachPhimPhanTrangService],
  exports: [LayDanhSachPhimPhanTrangService],
})
export class LayDanhSachPhimPhanTrangModule {}
