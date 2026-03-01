import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class LayDanhSachPhimService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async layDanhSachPhim(tenPhim?: string) {
    // Tạo cache key
    const cacheKey = `phim_list_${tenPhim || 'all'}`;

    // Kiểm tra cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`✅ [CACHE HIT] ${cacheKey}`);
      return cachedData;
    }

    console.log(`❌ [CACHE MISS] ${cacheKey}`);

    // Nếu có tenPhim → tìm kiếm theo tên
    if (tenPhim !== undefined && tenPhim.trim() !== '') {
      const danhSachPhim = await (this.prisma as any).phim.findMany({
        where: {
          ten_phim: {
            contains: tenPhim.trim(),
          },
        },
      });

      if (danhSachPhim.length === 0) {
        throw new NotFoundException(`Không tìm thấy phim nào có tên "${tenPhim}"`);
      }

      const result = { message: 'Tìm kiếm phim thành công', data: danhSachPhim };

      // Lưu vào cache (TTL: 60 giây)
      await this.cacheManager.set(cacheKey, result, 60000);
      console.log(`💾 [CACHE SET] ${cacheKey}`);

      return result;
    }

    // Nếu không có tenPhim → lấy toàn bộ phim
    const danhSachPhim = await (this.prisma as any).phim.findMany();

    const result = { message: 'Lấy danh sách phim thành công', data: danhSachPhim };

    // Lưu vào cache (TTL: 60 giây)
    await this.cacheManager.set(cacheKey, result, 60000);
    console.log(`💾 [CACHE SET] ${cacheKey}`);

    return result;
  }
}

