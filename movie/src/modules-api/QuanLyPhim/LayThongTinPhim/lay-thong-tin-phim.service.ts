import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class LayThongTinPhimService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async layThongTinPhim(maPhim?: string) {
    // Tạo cache key
    const cacheKey = `phim_info_${maPhim || 'all'}`;

    // Kiểm tra cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`✅ [CACHE HIT] ${cacheKey}`);
      return cachedData;
    }

    console.log(`❌ [CACHE MISS] ${cacheKey}`);

    // Nếu có maPhim → lấy 1 phim theo mã
    if (maPhim !== undefined && maPhim.trim() !== '') {
      const maPhimNum = parseInt(maPhim, 10);

      if (Number.isNaN(maPhimNum) || maPhimNum < 1000 || maPhimNum > 9999) {
        throw new NotFoundException('Mã phim phải là số có đúng 4 chữ số (1000 - 9999)');
      }

      const phim = await (this.prisma as any).phim.findUnique({
        where: { ma_phim: maPhimNum },
      });

      if (!phim) {
        throw new NotFoundException(`Không tìm thấy phim có mã ${maPhim}`);
      }

      const result = { message: 'Lấy thông tin phim thành công', data: phim };

      // Lưu vào cache (TTL: 60 giây)
      await this.cacheManager.set(cacheKey, result, 60000);
      console.log(`💾 [CACHE SET] ${cacheKey}`);

      return result;
    }

    // Nếu không có maPhim → lấy toàn bộ phim
    const danhSachPhim = await (this.prisma as any).phim.findMany();

    const result = { message: 'Lấy danh sách phim thành công', data: danhSachPhim };

    // Lưu vào cache (TTL: 60 giây)
    await this.cacheManager.set(cacheKey, result, 60000);
    console.log(`💾 [CACHE SET] ${cacheKey}`);

    return result;
  }
}

