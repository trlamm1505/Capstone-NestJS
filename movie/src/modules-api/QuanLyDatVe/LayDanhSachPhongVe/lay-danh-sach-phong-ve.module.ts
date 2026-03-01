import { Module } from '@nestjs/common';
import { LayDanhSachPhongVeController } from './lay-danh-sach-phong-ve.controller';
import { LayDanhSachPhongVeService } from './lay-danh-sach-phong-ve.service';

@Module({
  controllers: [LayDanhSachPhongVeController],
  providers: [LayDanhSachPhongVeService],
  exports: [LayDanhSachPhongVeService],
})
export class LayDanhSachPhongVeModule {}
