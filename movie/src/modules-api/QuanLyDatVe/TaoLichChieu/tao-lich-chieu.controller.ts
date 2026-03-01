import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TaoLichChieuService } from './tao-lich-chieu.service';
import { TaoLichChieuDto } from './dto/tao-lich-chieu.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('QuanLyDatVe')
@UseGuards(RolesGuard)
export class TaoLichChieuController {
  constructor(private readonly taoLichChieuService: TaoLichChieuService) {}

  @Post('TaoLichChieu')
  @Roles('admin')
  async taoLichChieu(@Body() body: TaoLichChieuDto) {
    return await this.taoLichChieuService.taoLichChieu(body);
  }
}
