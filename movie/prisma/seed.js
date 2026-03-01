// seed.js — Plain JS, chạy bằng node trực tiếp
const bcrypt = require('bcrypt');
const mariadb = require('mariadb');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL không tìm thấy trong .env');
  process.exit(1);
}

const url = new URL(DATABASE_URL);

const pool = mariadb.createPool({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.substring(1),
  port: Number(url.port),
  connectionLimit: 1,
  allowPublicKeyRetrieval: true,
});

async function main() {
  const ADMIN_TAI_KHOAN = 'admin';
  const ADMIN_MAT_KHAU = '12345';
  const ADMIN_EMAIL = 'admin@movie.com';
  const ADMIN_HO_TEN = 'Quản Trị Viên';
  const ADMIN_SO_DT = '0909999999';

  const conn = await pool.getConnection();

  try {
    // Kiểm tra admin đã tồn tại chưa
    const rows = await conn.query(
      'SELECT tai_khoan FROM NguoiDung WHERE tai_khoan = ?',
      [ADMIN_TAI_KHOAN],
    );

    if (rows.length > 0) {
      console.log(`✅ Tài khoản "${ADMIN_TAI_KHOAN}" đã tồn tại — bỏ qua seed.`);
      return;
    }

    const hashedPassword = bcrypt.hashSync(ADMIN_MAT_KHAU, 10);

    await conn.query(
      `INSERT INTO NguoiDung (tai_khoan, mat_khau, email, ho_ten, so_dt, loai_nguoi_dung, status)
       VALUES (?, ?, ?, ?, ?, 'admin', 1)`,
      [ADMIN_TAI_KHOAN, hashedPassword, ADMIN_EMAIL, ADMIN_HO_TEN, ADMIN_SO_DT],
    );

    console.log('🎉 Tạo tài khoản admin thành công!');
    console.log(`   taiKhoan : ${ADMIN_TAI_KHOAN}`);
    console.log(`   matKhau  : ${ADMIN_MAT_KHAU}`);
    console.log(`   role     : admin`);
  } finally {
    conn.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error('❌ Seed thất bại:', e.message);
  process.exit(1);
});
