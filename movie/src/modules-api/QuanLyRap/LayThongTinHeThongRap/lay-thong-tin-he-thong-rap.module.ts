import { Module } from '@nestjs/common';
import { LayThongTinHeThongRapController } from './lay-thong-tin-he-thong-rap.controller';
import { LayThongTinHeThongRapService } from './lay-thong-tin-he-thong-rap.service';

@Module({
  controllers: [LayThongTinHeThongRapController],
  providers: [LayThongTinHeThongRapService],
  exports: [LayThongTinHeThongRapService],
})
export class LayThongTinHeThongRapModule {}
