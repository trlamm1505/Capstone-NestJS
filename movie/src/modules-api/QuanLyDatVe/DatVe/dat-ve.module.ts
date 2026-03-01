import { Module } from '@nestjs/common';
import { DatVeController } from './dat-ve.controller';
import { DatVeService } from './dat-ve.service';

@Module({
  controllers: [DatVeController],
  providers: [DatVeService],
  exports: [DatVeService],
})
export class DatVeModule {}
