import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../src/modules-system/prisma/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const DATABASE_URL = process.env.DATABASE_URL as string;
const url = new URL(DATABASE_URL);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.substring(1),
  port: Number(url.port),
  connectionLimit: 5,
  allowPublicKeyRetrieval: true,
});

const prisma = new PrismaClient({ adapter } as any);


async function main() {
  const ADMIN_TAI_KHOAN = 'admin';
  const ADMIN_MAT_KHAU = '12345';
  const ADMIN_EMAIL = 'admin@movie.com';
  const ADMIN_HO_TEN = 'Quản Trị Viên';
  const ADMIN_SO_DT = '0909999999';

  // Kiểm tra admin đã tồn tại chưa
  const existing = await (prisma as any).nguoiDung.findUnique({
    where: { tai_khoan: ADMIN_TAI_KHOAN },
  });

  if (existing) {
    console.log(`✅ Tài khoản "${ADMIN_TAI_KHOAN}" đã tồn tại — bỏ qua seed.`);
    return;
  }

  const hashedPassword = bcrypt.hashSync(ADMIN_MAT_KHAU, 10);

  await (prisma as any).nguoiDung.create({
    data: {
      tai_khoan: ADMIN_TAI_KHOAN,
      mat_khau: hashedPassword,
      email: ADMIN_EMAIL,
      ho_ten: ADMIN_HO_TEN,
      so_dt: ADMIN_SO_DT,
      loai_nguoi_dung: 'admin',
      status: true,
    },
  });

  console.log('🎉 Tạo tài khoản admin thành công!');
  console.log(`   taiKhoan : ${ADMIN_TAI_KHOAN}`);
  console.log(`   matKhau  : ${ADMIN_MAT_KHAU}`);
  console.log(`   role     : admin`);
}

main()
  .catch((e) => {
    console.error('❌ Seed thất bại:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
