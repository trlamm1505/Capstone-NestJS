import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { uploadImageToCloudinary } from 'src/common/cloudinary/upload.cloudinary';
import { ThemPhimDto } from './dto/them-phim.dto';

@Injectable()
export class ThemPhimService {
  constructor(private prisma: PrismaService) {}

  async themPhim(
    body: ThemPhimDto,
    files?: any,
  ) {
    let { hinhAnh, trailer } = body;

    const imageFile = files?.hinhAnh?.[0];
    const trailerFile = files?.trailer?.[0];

    // Nếu có file ảnh thì upload lên Cloudinary và dùng URL trả về
    if (imageFile?.buffer) {
      hinhAnh = await uploadImageToCloudinary(
        imageFile.buffer,
        imageFile.mimetype || 'image/jpeg',
        'phim',
      );
    }

    // Nếu có file trailer (video) thì upload lên Cloudinary và dùng URL trả về
    if (trailerFile?.buffer) {
      trailer = await uploadImageToCloudinary(
        trailerFile.buffer,
        trailerFile.mimetype || 'video/mp4',
        'trailer',
      );
    }

    const { maPhim, tenPhim, moTa, ngayKhoiChieu, danhGia, hot } = body;

    // Kiểm tra maPhim đã tồn tại chưa
    const phimTonTai = await (this.prisma as any).phim.findUnique({
      where: { ma_phim: maPhim },
    });
    if (phimTonTai) {
      throw new BadRequestException(`Mã phim ${maPhim} đã tồn tại`);
    }

    // Tính sapChieu / dangChieu dựa theo ngayKhoiChieu
    const ngayChieu = new Date(ngayKhoiChieu);
    const homNay = new Date();
    homNay.setHours(0, 0, 0, 0);
    ngayChieu.setHours(0, 0, 0, 0);

    // Sắp chiếu: ngày khởi chiếu > hôm nay
    // Đang chiếu: ngày khởi chiếu <= hôm nay
    const sapChieu = ngayChieu > homNay;
    const dangChieu = ngayChieu <= homNay;

    const phimMoi = await (this.prisma as any).phim.create({
      data: {
        ma_phim: maPhim,
        ten_phim: tenPhim,
        trailer: trailer ?? null,
        hinh_anh: hinhAnh ?? null,
        mo_ta: moTa ?? null,
        ngay_khoi_chieu: ngayChieu,
        danh_gia: danhGia ?? null,
        hot: hot ?? false,
        dang_chieu: dangChieu,
        sap_chieu: sapChieu,
      },
    });

    return {
      message: 'Thêm phim thành công',
      data: phimMoi,
    };
  }
}
