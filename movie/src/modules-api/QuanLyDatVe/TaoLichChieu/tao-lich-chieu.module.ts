import { Module } from '@nestjs/common';
import { TaoLichChieuController } from './tao-lich-chieu.controller';
import { TaoLichChieuService } from './tao-lich-chieu.service';

@Module({
  controllers: [TaoLichChieuController],
  providers: [TaoLichChieuService],
  exports: [TaoLichChieuService],
})
export class TaoLichChieuModule {}
