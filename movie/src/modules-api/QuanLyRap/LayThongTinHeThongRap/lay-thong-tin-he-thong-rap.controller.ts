import { Controller, Get, Query } from '@nestjs/common';
import { LayThongTinHeThongRapService } from './lay-thong-tin-he-thong-rap.service';

@Controller('QuanLyRap')
export class LayThongTinHeThongRapController {
  constructor(
    private readonly layThongTinHeThongRapService: LayThongTinHeThongRapService,
  ) {}

  @Get('LayThongTinHeThongRap')
  async layThongTinHeThongRap(@Query('maHeThongRap') maHeThongRap?: string) {
    return await this.layThongTinHeThongRapService.layThongTinHeThongRap(maHeThongRap);
  }
}
