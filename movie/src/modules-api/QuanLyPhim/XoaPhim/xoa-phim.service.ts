import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class XoaPhimService {
  constructor(private prisma: PrismaService) {}

  async xoaPhim(maPhim: string) {
    if (!maPhim || maPhim.trim() === '') {
      throw new BadRequestException('Mã phim là bắt buộc');
    }

    const maPhimNum = parseInt(maPhim, 10);
    if (Number.isNaN(maPhimNum) || maPhimNum < 1000 || maPhimNum > 9999) {
      throw new BadRequestException('Mã phim phải là số có đúng 4 chữ số (1000 - 9999)');
    }

    const phim = await (this.prisma as any).phim.findUnique({
      where: { ma_phim: maPhimNum },
    });

    if (!phim) {
      throw new NotFoundException(`Không tìm thấy phim có mã ${maPhim}`);
    }

    // Thay vì xóa cứng, set cả dang_chieu và sap_chieu = false (soft delete)
    await (this.prisma as any).phim.update({
      where: { ma_phim: maPhimNum },
      data: { dang_chieu: false, sap_chieu: false },
    });

    return {
      message: 'Xóa phim thành công',
      maPhim: maPhimNum,
    };
  }
}
