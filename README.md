# Capstone-NestJS — Hướng dẫn chạy dự án

## Yêu cầu cài đặt trước

| Công cụ         | Phiên bản khuyến nghị |
| --------------- | --------------------- |
| Node.js         | >= 18.x               |
| npm             | >= 9.x                |
| MySQL / MariaDB | cổng `3307`           |
| Redis           | cổng `6380`           |
| Elasticsearch   | cổng `9200` (HTTPS)   |

---

## 1. Clone & di chuyển vào thư mục dự án

```bash
git clone <repo-url>
cd Capstone-NestJS/movie
```

---

## 2. Cài đặt dependencies

```bash
npm install
```

---

## 3. Cấu hình biến môi trường

Tạo (hoặc kiểm tra) file `.env` trong thư mục `movie/`:

```env
# Database MySQL/MariaDB
DATABASE_URL=mysql://<user>:<password>@<host>:<port>/<database>

# Redis
DATABASE_REDIS=redis://<host>:<port>

# Elasticsearch
ELASTIC_SEARCH_URL=https://<host>:<port>
ELASTIC_SEARCH_USERNAME=<username>
ELASTIC_SEARCH_PASSWORD=<password>

# JWT
ACCESS_TOKEN_SECRET=<your-access-token-secret>
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>

# Cloudinary (upload ảnh)
CLOUDINARY_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRECT=<your-api-secret>

# Port chạy server
PORT=3069
```

> **Lưu ý:** Đảm bảo MySQL đang chạy trên cổng `3307` và database `Movie` đã được tạo.

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

> Lệnh này tạo Prisma Client vào `src/modules-system/prisma/generated/prisma`.

---

## 5. Chạy Migration (tạo bảng trong database)

```bash
npx prisma migrate dev
```

> Nếu lần đầu tiên, Prisma sẽ tạo toàn bộ bảng theo `prisma/schema.prisma`.  
> Nếu chỉ muốn đẩy schema mà không tạo file migration:
>
> ```bash
> npx prisma db push
> ```

---

## 6. Seed dữ liệu ban đầu (tạo tài khoản admin)

```bash
npm run seed
```

Lệnh này tạo tài khoản admin mặc định:

| Trường            | Giá trị           |
| ----------------- | ----------------- |
| `tai_khoan`       | `admin`           |
| `mat_khau`        | `12345`           |
| `email`           | `admin@movie.com` |
| `loai_nguoi_dung` | `admin`           |

---

## 7. Chạy server

### Development (có hot-reload)

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

---

## 8. Kiểm tra server

Sau khi chạy, server lắng nghe tại:

```
http://localhost:3069
```

---

## Tóm tắt thứ tự chạy từ đầu

```bash
# 1. Cài packages
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Tạo bảng database
npx prisma migrate dev

# 4. Seed admin account
npm run seed

# 5. Chạy server dev
npm run start:dev
```
