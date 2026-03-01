import { Module } from '@nestjs/common';
import { LayThongTinLichChieuPhimController } from './lay-thong-tin-lich-chieu-phim.controller';
import { LayThongTinLichChieuPhimService } from './lay-thong-tin-lich-chieu-phim.service';

@Module({
  controllers: [LayThongTinLichChieuPhimController],
  providers: [LayThongTinLichChieuPhimService],
  exports: [LayThongTinLichChieuPhimService],
})
export class LayThongTinLichChieuPhimModule {}
