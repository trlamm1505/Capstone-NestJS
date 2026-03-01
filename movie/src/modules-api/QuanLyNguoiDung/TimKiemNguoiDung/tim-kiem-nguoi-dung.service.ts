import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class TimKiemNguoiDungService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async timKiemNguoiDung(tuKhoa?: string) {
    // Tạo cache key
    const cacheKey = `tim_kiem_nguoi_dung_${tuKhoa || 'all'}`;

    // Kiểm tra cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`✅ [CACHE HIT] ${cacheKey}`);
      return cachedData;
    }


    // Build điều kiện tìm kiếm
    const whereConditions: any = {};

    // Tìm kiếm theo từ khóa (chỉ trong tai_khoan, ho_ten, ma_nhom)
    if (tuKhoa && tuKhoa.trim() !== '') {
      whereConditions.OR = [
        { tai_khoan: { contains: tuKhoa } },
        { ho_ten: { contains: tuKhoa } },
        { ma_nhom: { contains: tuKhoa } },
      ];
    }

    // Lấy danh sách người dùng (nếu không có tuKhoa thì lấy tất cả)
    const danhSachNguoiDung = await (this.prisma as any).nguoiDung.findMany({
      where: whereConditions,
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

    // Lưu vào cache (TTL: 60 giây)
    await this.cacheManager.set(cacheKey, danhSachNguoiDung, 60000);
    console.log(`💾 [CACHE SET] ${cacheKey}`);

    return danhSachNguoiDung;
  }
}
