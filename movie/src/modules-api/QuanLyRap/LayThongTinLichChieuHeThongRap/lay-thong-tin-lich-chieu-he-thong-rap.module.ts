import { Module } from '@nestjs/common';
import { LayThongTinLichChieuHeThongRapController } from './lay-thong-tin-lich-chieu-he-thong-rap.controller';
import { LayThongTinLichChieuHeThongRapService } from './lay-thong-tin-lich-chieu-he-thong-rap.service';

@Module({
  controllers: [LayThongTinLichChieuHeThongRapController],
  providers: [LayThongTinLichChieuHeThongRapService],
  exports: [LayThongTinLichChieuHeThongRapService],
})
export class LayThongTinLichChieuHeThongRapModule {}
