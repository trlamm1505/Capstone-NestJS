import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { DatVeDto } from './dto/dat-ve.dto';

@Injectable()
export class DatVeService {
  constructor(private prisma: PrismaService) {}

  async datVe(body: DatVeDto, taiKhoan: string) {
    const { maLichChieu, danhSachVe } = body;

    // Kiểm tra lịch chiếu tồn tại
    const lichChieu = await (this.prisma as any).lichChieu.findUnique({
      where: { ma_lich_chieu: maLichChieu },
    });
    if (!lichChieu) {
      throw new NotFoundException(`Không tìm thấy lịch chiếu có mã ${maLichChieu}`);
    }

    // Kiểm tra từng ghế: tồn tại và chưa bị đặt
    for (const ve of danhSachVe) {
      const ghe = await (this.prisma as any).ghe.findUnique({
        where: { ma_ghe: ve.maGhe },
      });
      if (!ghe) {
        throw new NotFoundException(`Không tìm thấy ghế có mã ${ve.maGhe}`);
      }

      const gheDaDat = await (this.prisma as any).datVe.findUnique({
        where: {
          tai_khoan_ma_lich_chieu_ma_ghe: {
            tai_khoan: taiKhoan,
            ma_lich_chieu: maLichChieu,
            ma_ghe: ve.maGhe,
          },
        },
      });
      if (gheDaDat) {
        throw new BadRequestException(
          `Ghế ${ve.maGhe} đã được bạn đặt cho lịch chiếu này`,
        );
      }

      // Kiểm tra ghế đã bị người khác đặt chưa
      const gheDaDatNguoiKhac = await (this.prisma as any).datVe.findFirst({
        where: {
          ma_lich_chieu: maLichChieu,
          ma_ghe: ve.maGhe,
        },
      });
      if (gheDaDatNguoiKhac) {
        throw new BadRequestException(
          `Ghế ${ve.maGhe} đã được đặt bởi người khác`,
        );
      }
    }

    // Đặt tất cả ghế bằng transaction
    const ketQuaDatVe = await (this.prisma as any).$transaction(
      danhSachVe.map((ve) =>
        (this.prisma as any).datVe.create({
          data: {
            tai_khoan: taiKhoan,
            ma_lich_chieu: maLichChieu,
            ma_ghe: ve.maGhe,
          },
        }),
      ),
    );

    return {
      message: 'Đặt vé thành công',
      maLichChieu,
      taiKhoan,
      soVeDat: ketQuaDatVe.length,
      data: ketQuaDatVe,
    };
  }
}
