import { Module } from '@nestjs/common';
import { LayThongTinPhimController } from './lay-thong-tin-phim.controller';
import { LayThongTinPhimService } from './lay-thong-tin-phim.service';

@Module({
  controllers: [LayThongTinPhimController],
  providers: [LayThongTinPhimService],
  exports: [LayThongTinPhimService],
})
export class LayThongTinPhimModule {}
