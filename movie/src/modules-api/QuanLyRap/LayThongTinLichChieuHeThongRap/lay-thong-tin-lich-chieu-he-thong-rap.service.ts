import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class LayThongTinLichChieuHeThongRapService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async layThongTinLichChieuHeThongRap(maHeThongRap?: string) {
    // Tạo cache key
    const cacheKey = `lich_chieu_he_thong_rap_${maHeThongRap || 'all'}`;

    // Kiểm tra cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`✅ [CACHE HIT] ${cacheKey}`);
      return cachedData;
    }

    console.log(`❌ [CACHE MISS] ${cacheKey}`);

    // Build điều kiện WHERE cho RapPhim thông qua CumRap → HeThongRap
    const whereRapPhim: any = {};

    if (maHeThongRap !== undefined && maHeThongRap.trim() !== '') {
      const maNum = parseInt(maHeThongRap, 10);

      if (Number.isNaN(maNum) || maNum < 1) {
        throw new NotFoundException('Mã hệ thống rạp không hợp lệ');
      }

      // Kiểm tra hệ thống rạp tồn tại
      const heThongRap = await (this.prisma as any).heThongRap.findUnique({
        where: { ma_he_thong_rap: maNum },
      });

      if (!heThongRap) {
        throw new NotFoundException(`Không tìm thấy hệ thống rạp có mã ${maHeThongRap}`);
      }

      // Filter RapPhim theo HeThongRap qua CumRap
      whereRapPhim.CumRap = { ma_he_thong_rap: maNum };
    }

    // Lấy danh sách RapPhim kèm LichChieu (và thông tin Phim trong LichChieu)
    const danhSachRap = await (this.prisma as any).rapPhim.findMany({
      where: whereRapPhim,
      select: {
        ma_rap: true,
        ten_rap: true,
        ma_cum_rap: true,
      },
    });

    const result = {
      message: 'Lấy thông tin lịch chiếu hệ thống rạp thành công',
      data: danhSachRap,
    };

    await this.cacheManager.set(cacheKey, result, 60000);
    console.log(`💾 [CACHE SET] ${cacheKey}`);

    return result;
  }
}
