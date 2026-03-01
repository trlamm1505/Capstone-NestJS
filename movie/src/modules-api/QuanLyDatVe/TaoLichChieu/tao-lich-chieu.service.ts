import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { TaoLichChieuDto } from './dto/tao-lich-chieu.dto';

@Injectable()
export class TaoLichChieuService {
  constructor(private prisma: PrismaService) {}

  async taoLichChieu(body: TaoLichChieuDto) {
    const { maPhim, ngayChieuGioChieu, maRap, giaVe } = body;

    // Kiểm tra phim tồn tại
    const phim = await (this.prisma as any).phim.findUnique({
      where: { ma_phim: maPhim },
    });
    if (!phim) {
      throw new NotFoundException(`Không tìm thấy phim có mã ${maPhim}`);
    }

    // Kiểm tra rạp tồn tại
    const rap = await (this.prisma as any).rapPhim.findUnique({
      where: { ma_rap: maRap },
    });
    if (!rap) {
      throw new NotFoundException(`Không tìm thấy rạp có mã ${maRap}`);
    }

    // Parse ngày giờ chiếu
    const ngayGioChieu = new Date(ngayChieuGioChieu);
    if (isNaN(ngayGioChieu.getTime())) {
      throw new BadRequestException(
        'Ngày chiếu giờ chiếu không đúng định dạng (VD: 2024-06-10T18:00:00)',
      );
    }

    // Kiểm tra trùng lịch chiếu (cùng rạp, cùng phim, cùng giờ)
    const lichChieuTonTai = await (this.prisma as any).lichChieu.findFirst({
      where: {
        ma_phim: maPhim,
        ma_rap: maRap,
        ngay_gio_chieu: ngayGioChieu,
      },
    });
    if (lichChieuTonTai) {
      throw new BadRequestException(
        'Lịch chiếu này đã tồn tại (cùng phim, cùng rạp, cùng giờ)',
      );
    }

    const lichChieuMoi = await (this.prisma as any).lichChieu.create({
      data: {
        ma_phim: maPhim,
        ma_rap: maRap,
        ngay_gio_chieu: ngayGioChieu,
        gia_ve: giaVe,
      },
    });

    return {
      message: 'Tạo lịch chiếu thành công',
      data: lichChieuMoi,
    };
  }
}
