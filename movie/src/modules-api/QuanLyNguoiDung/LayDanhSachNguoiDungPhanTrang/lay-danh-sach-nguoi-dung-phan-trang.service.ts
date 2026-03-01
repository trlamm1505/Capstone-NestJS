import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class LayDanhSachNguoiDungPhanTrangService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async layDanhSachNguoiDungPhanTrang(
    tuKhoa?: string,
    soTrang?: string,
    soPhanTuTrenTrang?: string,
  ) {
    // Tạo cache key dựa trên params
    const cacheKey = `nguoi_dung_list_${tuKhoa || 'all'}_${soTrang || 1}_${soPhanTuTrenTrang || 20}`;

    // 1️⃣ Kiểm tra cache trước
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`✅ [CACHE HIT] ${cacheKey}`);
      return cachedData;
    }


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

    // Tìm kiếm theo từ khóa (chỉ trong tai_khoan, ho_ten, ma_nhom)
    if (tuKhoa && tuKhoa.trim() !== '') {
      whereConditions.OR = [
        { tai_khoan: { contains: tuKhoa } },
        { ho_ten: { contains: tuKhoa } },
        { ma_nhom: { contains: tuKhoa } },
      ];
    }

    // 4️⃣ Query database
    const resultPrismaPromise = (this.prisma as any).nguoiDung.findMany({
      where: whereConditions,
      skip: index,
      take: pageSize,
      select: {
        tai_khoan: true,
        ho_ten: true,
        email: true,
        so_dt: true,
        ma_nhom: true,
        loai_nguoi_dung: true,
        status: true,
      },
    });

    const totalItemPromise = (this.prisma as any).nguoiDung.count({
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





