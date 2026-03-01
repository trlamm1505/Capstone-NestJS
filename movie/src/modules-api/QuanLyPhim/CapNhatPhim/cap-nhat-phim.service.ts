import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { uploadImageToCloudinary } from 'src/common/cloudinary/upload.cloudinary';
import { CapNhatPhimDto } from './dto/cap-nhat-phim.dto';

@Injectable()
export class CapNhatPhimService {
  constructor(private prisma: PrismaService) {}

  async capNhatPhim(body: CapNhatPhimDto, files?: any) {
    const { maPhim } = body;

    const phimTonTai = await (this.prisma as any).phim.findUnique({
      where: { ma_phim: maPhim },
    });
    if (!phimTonTai) {
      throw new BadRequestException(`Không tìm thấy phim có mã ${maPhim}`);
    }

    let hinhAnh = body.hinhAnh;
    let trailer = body.trailer;

    const imageFile = files?.hinhAnh?.[0];
    const trailerFile = files?.trailer?.[0];

    if (imageFile?.buffer) {
      hinhAnh = await uploadImageToCloudinary(
        imageFile.buffer,
        imageFile.mimetype || 'image/jpeg',
        'phim',
      );
    }

    if (trailerFile?.buffer) {
      trailer = await uploadImageToCloudinary(
        trailerFile.buffer,
        trailerFile.mimetype || 'video/mp4',
        'trailer',
      );
    }

    const data: Record<string, unknown> = {};

    // Chỉ cập nhật nếu người dùng thực sự gửi giá trị (không undefined / rỗng)
    if (body.tenPhim !== undefined && body.tenPhim !== '') {
      data.ten_phim = body.tenPhim;
    }
    if (trailer !== undefined && trailer !== '') {
      data.trailer = trailer ?? null;
    }
    if (hinhAnh !== undefined && hinhAnh !== '') {
      data.hinh_anh = hinhAnh ?? null;
    }
    if (body.moTa !== undefined && body.moTa !== '') {
      data.mo_ta = body.moTa ?? null;
    }
    if (body.danhGia !== undefined && body.danhGia !== ('' as any)) {
      data.danh_gia = body.danhGia;
    }
    if (body.hot !== undefined && body.hot !== ('' as any)) {
      data.hot = body.hot;
    }

    if (body.ngayKhoiChieu !== undefined && body.ngayKhoiChieu !== '') {
      const ngayChieu = new Date(body.ngayKhoiChieu);
      ngayChieu.setHours(0, 0, 0, 0);
      data.ngay_khoi_chieu = ngayChieu;
      const homNay = new Date();
      homNay.setHours(0, 0, 0, 0);
      data.sap_chieu = ngayChieu > homNay;
      data.dang_chieu = ngayChieu <= homNay;
    }

    const phimCapNhat = await (this.prisma as any).phim.update({
      where: { ma_phim: maPhim },
      data,
    });

    return {
      message: 'Cập nhật phim thành công',
      data: phimCapNhat,
    };
  }
}
