import { Module } from '@nestjs/common';
import { LayThongTinCumRapTheoHeThongController } from './lay-thong-tin-cum-rap-theo-he-thong.controller';
import { LayThongTinCumRapTheoHeThongService } from './lay-thong-tin-cum-rap-theo-he-thong.service';

@Module({
  controllers: [LayThongTinCumRapTheoHeThongController],
  providers: [LayThongTinCumRapTheoHeThongService],
  exports: [LayThongTinCumRapTheoHeThongService],
})
export class LayThongTinCumRapTheoHeThongModule {}
