import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules-api/auth/auth.module';
import { PrismaModule } from './modules-system/prisma/prisma.module';
import { TokenModule } from './modules-system/token/token.module';
import { RedisModule } from './modules-system/redis/redis.module';
import { LayDanhSachLoaiNguoiDungModule } from './modules-api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung/lay-danh-sach-loai-nguoi-dung.module';
import { LayDanhSachNguoiDungModule } from './modules-api/QuanLyNguoiDung/LayDanhSachNguoiDung/lay-danh-sach-nguoi-dung.module';
import { LayDanhSachNguoiDungPhanTrangModule } from './modules-api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang/lay-danh-sach-nguoi-dung-phan-trang.module';
import { TimKiemNguoiDungModule } from './modules-api/QuanLyNguoiDung/TimKiemNguoiDung/tim-kiem-nguoi-dung.module';
import { TimKiemNguoiDungPhanTrangModule } from './modules-api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang/tim-kiem-nguoi-dung-phan-trang.module';
import { ThongTinTaiKhoanModule } from './modules-api/QuanLyNguoiDung/ThongTinTaiKhoan/thong-tin-tai-khoan.module';
import { LayThongTinNguoiDungModule } from './modules-api/QuanLyNguoiDung/LayThongTinNguoiDung/lay-thong-tin-nguoi-dung.module';
import { ThemNguoiDungModule } from './modules-api/QuanLyNguoiDung/ThemNguoiDung/them-nguoi-dung.module';
import { CapNhatThongTinNguoiDungModule } from './modules-api/QuanLyNguoiDung/CapNhatThongTinNguoiDung/cap-nhat-thong-tin-nguoi-dung.module';
import { XoaNguoiDungModule } from './modules-api/QuanLyNguoiDung/XoaNguoiDung/xoa-nguoi-dung.module';
import { ThemPhimModule } from './modules-api/QuanLyPhim/ThemPhim/them-phim.module';
import { CapNhatPhimModule } from './modules-api/QuanLyPhim/CapNhatPhim/cap-nhat-phim.module';
import { XoaPhimModule } from './modules-api/QuanLyPhim/XoaPhim/xoa-phim.module';
import { LayThongTinPhimModule } from './modules-api/QuanLyPhim/LayThongTinPhim/lay-thong-tin-phim.module';
import { LayDanhSachPhimModule } from './modules-api/QuanLyPhim/LayDanhSachPhim/lay-danh-sach-phim.module';
import { LayDanhSachPhimPhanTrangModule } from './modules-api/QuanLyPhim/LayDanhSachPhimPhanTrang/lay-danh-sach-phim-phan-trang.module';
import { LayThongTinHeThongRapModule } from './modules-api/QuanLyRap/LayThongTinHeThongRap/lay-thong-tin-he-thong-rap.module';
import { LayThongTinCumRapTheoHeThongModule } from './modules-api/QuanLyRap/LayThongTinCumRapTheoHeThong/lay-thong-tin-cum-rap-theo-he-thong.module';
import { LayThongTinLichChieuHeThongRapModule } from './modules-api/QuanLyRap/LayThongTinLichChieuHeThongRap/lay-thong-tin-lich-chieu-he-thong-rap.module';
import { LayThongTinLichChieuPhimModule } from './modules-api/QuanLyRap/LayThongTinLichChieuPhim/lay-thong-tin-lich-chieu-phim.module';
import { TaoLichChieuModule } from './modules-api/QuanLyDatVe/TaoLichChieu/tao-lich-chieu.module';
import { LayDanhSachPhongVeModule } from './modules-api/QuanLyDatVe/LayDanhSachPhongVe/lay-danh-sach-phong-ve.module';
import { DatVeModule } from './modules-api/QuanLyDatVe/DatVe/dat-ve.module';
import { ProtectGuard } from './common/guards/protect.guard';

@Module({
  imports: [
    PrismaModule,
    TokenModule,
    RedisModule,
    AuthModule,
    LayDanhSachLoaiNguoiDungModule,
    LayDanhSachNguoiDungModule,
    LayDanhSachNguoiDungPhanTrangModule,
    TimKiemNguoiDungModule,
    TimKiemNguoiDungPhanTrangModule,
    ThongTinTaiKhoanModule,
    LayThongTinNguoiDungModule,
    ThemNguoiDungModule,
    CapNhatThongTinNguoiDungModule,
    XoaNguoiDungModule,
    ThemPhimModule,
    CapNhatPhimModule,
    XoaPhimModule,
    LayThongTinPhimModule,
    LayDanhSachPhimModule,
    LayDanhSachPhimPhanTrangModule,
    LayThongTinHeThongRapModule,
    LayThongTinCumRapTheoHeThongModule,
    LayThongTinLichChieuHeThongRapModule,
    LayThongTinLichChieuPhimModule,
    TaoLichChieuModule,
    LayDanhSachPhongVeModule,
    DatVeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ProtectGuard,
    },
  ],
})
export class AppModule {}
