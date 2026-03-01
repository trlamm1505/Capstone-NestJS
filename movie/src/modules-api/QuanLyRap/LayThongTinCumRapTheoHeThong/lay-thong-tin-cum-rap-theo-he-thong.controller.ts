import { Controller, Get, Query } from '@nestjs/common';
import { LayThongTinCumRapTheoHeThongService } from './lay-thong-tin-cum-rap-theo-he-thong.service';

@Controller('QuanLyRap')
export class LayThongTinCumRapTheoHeThongController {
  constructor(
    private readonly layThongTinCumRapTheoHeThongService: LayThongTinCumRapTheoHeThongService,
  ) {}

  @Get('LayThongTinCumRapTheoHeThong')
  async layThongTinCumRapTheoHeThong(
    @Query('maHeThongRap') maHeThongRap?: string,
  ) {
    return await this.layThongTinCumRapTheoHeThongService.layThongTinCumRapTheoHeThong(
      maHeThongRap,
    );
  }
}
