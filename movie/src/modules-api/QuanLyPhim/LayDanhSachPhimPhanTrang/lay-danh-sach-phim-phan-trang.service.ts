import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class LayDanhSachPhimPhanTrangService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async layDanhSachPhimPhanTrang(
    tenPhim?: string,
    soTrang?: string,
    soPhanTuTrenTrang?: string,
  ) {
    // Tạo cache key dựa trên params
    const cacheKey = `phim_phan_trang_${tenPhim || 'all'}_${soTrang || 1}_${soPhanTuTrenTrang || 20}`;

    // 1️⃣ Kiểm tra cache trước
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`✅ [CACHE HIT] ${cacheKey}`);
      return cachedData;
    }

    console.log(`❌ [CACHE MISS] ${cacheKey}`);

    // 2️⃣ Xử lý pagination
    let page = Number(soTrang) || 1;
    let pageSize = Number(soPhanTuTrenTrang) || 20;

    // Đảm bảo giá trị hợp lệ (>= 1)
    page = Math.max(page, 1);
    pageSize = Math.max(pageSize, 1);

    // Tính index (offset)
    const index = (page - 1) * pageSize;

    // 3️⃣ Build điều kiện WHERE
    const whereConditions: any = {};

    // Tìm kiếm theo tên phim (contains)
    if (tenPhim && tenPhim.trim() !== '') {
      whereConditions.ten_phim = { contains: tenPhim.trim() };
    }

    // 4️⃣ Query database
    const resultPrismaPromise = (this.prisma as any).phim.findMany({
      where: whereConditions,
      skip: index,
      take: pageSize,
    });

    const totalItemPromise = (this.prisma as any).phim.count({
      where: whereConditions,
    });

    const [resultPrisma, totalItem] = await Promise.all([
      resultPrismaPromise,
      totalItemPromise,
    ]);

    const result = {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: Math.ceil(totalItem / pageSize),
      items: resultPrisma,
    };

    // 5️⃣ Lưu vào cache (TTL: 60 giây)
    await this.cacheManager.set(cacheKey, result, 60000);
    console.log(`💾 [CACHE SET] ${cacheKey}`);

    return result;
  }
}
