import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class LayThongTinCumRapTheoHeThongService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async layThongTinCumRapTheoHeThong(maHeThongRap?: string) {
    // Tạo cache key
    const cacheKey = `cum_rap_he_thong_${maHeThongRap || 'all'}`;

    // Kiểm tra cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`✅ [CACHE HIT] ${cacheKey}`);
      return cachedData;
    }

    console.log(`❌ [CACHE MISS] ${cacheKey}`);

    // Nếu có maHeThongRap → lấy cụm rạp theo hệ thống
    if (maHeThongRap !== undefined && maHeThongRap.trim() !== '') {
      const maNum = parseInt(maHeThongRap, 10);

      if (Number.isNaN(maNum) || maNum < 1) {
        throw new NotFoundException('Mã hệ thống rạp không hợp lệ');
      }

      // Kiểm tra hệ thống rạp có tồn tại không
      const heThongRap = await (this.prisma as any).heThongRap.findUnique({
        where: { ma_he_thong_rap: maNum },
      });

      if (!heThongRap) {
        throw new NotFoundException(`Không tìm thấy hệ thống rạp có mã ${maHeThongRap}`);
      }

      const danhSachCumRap = await (this.prisma as any).cumRap.findMany({
        where: { ma_he_thong_rap: maNum },
        select: {
          ma_cum_rap: true,
          ten_cum_rap: true,
          dia_chi: true,
          ma_he_thong_rap: true,
        },
      });

      const result = {
        message: 'Lấy thông tin cụm rạp thành công',
        data: danhSachCumRap,
      };

      await this.cacheManager.set(cacheKey, result, 60000);
      console.log(`💾 [CACHE SET] ${cacheKey}`);

      return result;
    }

    // Nếu không có maHeThongRap → lấy toàn bộ cụm rạp
    const danhSachCumRap = await (this.prisma as any).cumRap.findMany({
      select: {
        ma_cum_rap: true,
        ten_cum_rap: true,
        dia_chi: true,
        ma_he_thong_rap: true,
      },
    });

    const result = {
      message: 'Lấy danh sách cụm rạp thành công',
      data: danhSachCumRap,
    };

    await this.cacheManager.set(cacheKey, result, 60000);
    console.log(`💾 [CACHE SET] ${cacheKey}`);

    return result;
  }
}
