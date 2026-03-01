import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class LayDanhSachLoaiNguoiDungService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async layDanhSachLoaiNguoiDung() {
    const cacheKey = 'loai_nguoi_dung_list';

    // Kiểm tra cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      console.log(`✅ [CACHE HIT] ${cacheKey}`);
      return cachedData;
    }

    console.log(`❌ [CACHE MISS] ${cacheKey}`);

    // Trả về danh sách các loại người dùng
    const danhSachLoaiNguoiDung = [
      {
        maLoaiNguoiDung: 'user',
        tenLoai: 'Khách hàng',
      },
      {
        maLoaiNguoiDung: 'admin',
        tenLoai: 'Quản trị',
      },
    ];

    // Lưu vào cache (TTL: 60 giây)
    await this.cacheManager.set(cacheKey, danhSachLoaiNguoiDung, 60000);
    console.log(`💾 [CACHE SET] ${cacheKey}`);

    return danhSachLoaiNguoiDung;
  }
}
