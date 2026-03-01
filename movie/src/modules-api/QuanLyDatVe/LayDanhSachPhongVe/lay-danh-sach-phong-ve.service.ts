import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class LayDanhSachPhongVeService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async layDanhSachPhongVe(maLichChieu: string) {
    const maNum = parseInt(maLichChieu, 10);
    if (Number.isNaN(maNum) || maNum < 1) {
      throw new NotFoundException('Mã lịch chiếu không hợp lệ');
    }

    // Tạo cache key
    const cacheKey = `phong_ve_${maNum}`;

    // Kiểm tra cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`✅ [CACHE HIT] ${cacheKey}`);
      return cachedData;
    }

    console.log(`❌ [CACHE MISS] ${cacheKey}`);

    // Kiểm tra lịch chiếu tồn tại
    const lichChieu = await (this.prisma as any).lichChieu.findUnique({
      where: { ma_lich_chieu: maNum },
    });

    if (!lichChieu) {
      throw new NotFoundException(`Không tìm thấy lịch chiếu có mã ${maLichChieu}`);
    }

    // Lấy tất cả ghế của rạp thuộc lịch chiếu
    const danhSachGhe = await (this.prisma as any).ghe.findMany({
      where: { ma_rap: lichChieu.ma_rap },
      select: {
        ma_ghe: true,
        ten_ghe: true,
        loai_ghe: true,
        ma_rap: true,
      },
    });

    // Lấy danh sách ghế đã được đặt cho lịch chiếu này
    const gheDaDat = await (this.prisma as any).datVe.findMany({
      where: { ma_lich_chieu: maNum },
      select: { ma_ghe: true },
    });

    const gheDaDatSet = new Set(gheDaDat.map((dv: any) => dv.ma_ghe));

    // Gắn trạng thái đặt vé cho từng ghế
    const danhSachGheVoiTrangThai = danhSachGhe.map((ghe: any) => ({
      ...ghe,
      daDat: gheDaDatSet.has(ghe.ma_ghe),
    }));

    const result = {
      message: 'Lấy danh sách phòng vé thành công',
      maLichChieu: maNum,
      data: danhSachGheVoiTrangThai,
    };

    // Lưu vào cache (TTL: 30 giây - dữ liệu đặt vé thay đổi nhanh)
    await this.cacheManager.set(cacheKey, result, 30000);
    console.log(`💾 [CACHE SET] ${cacheKey}`);

    return result;
  }
}
