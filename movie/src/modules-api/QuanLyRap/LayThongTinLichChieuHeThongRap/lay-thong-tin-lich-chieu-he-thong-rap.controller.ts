import { Controller, Get, Query } from '@nestjs/common';
import { LayThongTinLichChieuHeThongRapService } from './lay-thong-tin-lich-chieu-he-thong-rap.service';

@Controller('QuanLyRap')
export class LayThongTinLichChieuHeThongRapController {
  constructor(
    private readonly layThongTinLichChieuHeThongRapService: LayThongTinLichChieuHeThongRapService,
  ) {}

  @Get('LayThongTinLichChieuHeThongRap')
  async layThongTinLichChieuHeThongRap(
    @Query('maHeThongRap') maHeThongRap?: string,
  ) {
    return await this.layThongTinLichChieuHeThongRapService.layThongTinLichChieuHeThongRap(
      maHeThongRap,
    );
  }
}
