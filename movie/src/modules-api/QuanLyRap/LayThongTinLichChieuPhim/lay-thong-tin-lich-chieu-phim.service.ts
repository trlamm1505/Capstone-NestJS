import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class LayThongTinLichChieuPhimService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async layThongTinLichChieuPhim(maPhim?: string) {
    // Tạo cache key
    const cacheKey = `lich_chieu_phim_${maPhim || 'all'}`;

    // Kiểm tra cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`✅ [CACHE HIT] ${cacheKey}`);
      return cachedData;
    }

    console.log(`❌ [CACHE MISS] ${cacheKey}`);

    const whereConditions: any = {};

    if (maPhim !== undefined && maPhim.trim() !== '') {
      const maNum = parseInt(maPhim, 10);

      if (Number.isNaN(maNum) || maNum < 1) {
        throw new NotFoundException('Mã phim không hợp lệ');
      }

      // Kiểm tra phim tồn tại
      const phim = await (this.prisma as any).phim.findUnique({
        where: { ma_phim: maNum },
      });

      if (!phim) {
        throw new NotFoundException(`Không tìm thấy phim có mã ${maPhim}`);
      }

      whereConditions.ma_phim = maNum;
    }

    const danhSachLichChieu = await (this.prisma as any).lichChieu.findMany({
      where: whereConditions,
      select: {
        ma_lich_chieu: true,
        ma_rap: true,
        ma_phim: true,
        ngay_gio_chieu: true,
        gia_ve: true,
      },
    });

    const result = {
      message: 'Lấy thông tin lịch chiếu phim thành công',
      data: danhSachLichChieu,
    };

    await this.cacheManager.set(cacheKey, result, 60000);
    console.log(`💾 [CACHE SET] ${cacheKey}`);

    return result;
  }
}
