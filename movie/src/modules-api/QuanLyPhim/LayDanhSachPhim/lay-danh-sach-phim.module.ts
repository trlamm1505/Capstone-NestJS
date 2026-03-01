import { Module } from '@nestjs/common';
import { LayDanhSachPhimController } from './lay-danh-sach-phim.controller';
import { LayDanhSachPhimService } from './lay-danh-sach-phim.service';

@Module({
  controllers: [LayDanhSachPhimController],
  providers: [LayDanhSachPhimService],
  exports: [LayDanhSachPhimService],
})
export class LayDanhSachPhimModule {}
