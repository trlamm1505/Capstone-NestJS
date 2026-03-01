import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class LayThongTinHeThongRapService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async layThongTinHeThongRap(maHeThongRap?: string) {
    // Tạo cache key
    const cacheKey = `he_thong_rap_${maHeThongRap || 'all'}`;

    // Kiểm tra cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`✅ [CACHE HIT] ${cacheKey}`);
      return cachedData;
    }

    console.log(`❌ [CACHE MISS] ${cacheKey}`);

    // Nếu có maHeThongRap → lấy 1 hệ thống rạp theo mã
    if (maHeThongRap !== undefined && maHeThongRap.trim() !== '') {
      const maNum = parseInt(maHeThongRap, 10);

      if (Number.isNaN(maNum) || maNum < 1) {
        throw new NotFoundException('Mã hệ thống rạp không hợp lệ');
      }

      const heThongRap = await (this.prisma as any).heThongRap.findUnique({
        where: { ma_he_thong_rap: maNum },
        select: {
          ma_he_thong_rap: true,
          ten_he_thong_rap: true,
          logo: true,
        },
      });

      if (!heThongRap) {
        throw new NotFoundException(`Không tìm thấy hệ thống rạp có mã ${maHeThongRap}`);
      }

      const result = {
        message: 'Lấy thông tin hệ thống rạp thành công',
        data: heThongRap,
      };

      await this.cacheManager.set(cacheKey, result, 60000);
      console.log(`💾 [CACHE SET] ${cacheKey}`);

      return result;
    }

    // Nếu không có maHeThongRap → lấy toàn bộ hệ thống rạp
    const danhSach = await (this.prisma as any).heThongRap.findMany({
      select: {
        ma_he_thong_rap: true,
        ten_he_thong_rap: true,
        logo: true,
      },
    });

    const result = {
      message: 'Lấy danh sách hệ thống rạp thành công',
      data: danhSach,
    };

    await this.cacheManager.set(cacheKey, result, 60000);
    console.log(`💾 [CACHE SET] ${cacheKey}`);

    return result;
  }
}
