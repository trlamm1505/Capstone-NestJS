import { Body, Controller, Post, Request } from '@nestjs/common';
import { DatVeService } from './dat-ve.service';
import { DatVeDto } from './dto/dat-ve.dto';

@Controller('QuanLyDatVe')
export class DatVeController {
  constructor(private readonly datVeService: DatVeService) {}

  @Post('DatVe')
  async datVe(@Body() body: DatVeDto, @Request() req: any) {
    const taiKhoan = req.user.tai_khoan;
    return await this.datVeService.datVe(body, taiKhoan);
  }
}
