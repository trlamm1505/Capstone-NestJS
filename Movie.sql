CREATE TABLE HeThongRap (
  ma_he_thong_rap INT AUTO_INCREMENT PRIMARY KEY,
  ten_he_thong_rap VARCHAR(255) NOT NULL,
  logo VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE CumRap (
  ma_cum_rap INT AUTO_INCREMENT PRIMARY KEY,
  ten_cum_rap VARCHAR(255) NOT NULL,
  dia_chi VARCHAR(255),
  ma_he_thong_rap INT NOT NULL,

  CONSTRAINT fk_cumrap_hethongrap
    FOREIGN KEY (ma_he_thong_rap)
    REFERENCES HeThongRap(ma_he_thong_rap)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE RapPhim (
  ma_rap INT AUTO_INCREMENT PRIMARY KEY,
  ten_rap VARCHAR(255) NOT NULL,
  ma_cum_rap INT NOT NULL,

  CONSTRAINT fk_rapphim_cumrap
    FOREIGN KEY (ma_cum_rap)
    REFERENCES CumRap(ma_cum_rap)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Phim (
  ma_phim INT AUTO_INCREMENT PRIMARY KEY,
  ten_phim VARCHAR(255) NOT NULL,
  trailer VARCHAR(255),
  hinh_anh VARCHAR(255),
  mo_ta VARCHAR(255),
  ngay_khoi_chieu DATE,
  danh_gia INT,
  hot BOOLEAN DEFAULT FALSE,
  dang_chieu BOOLEAN DEFAULT FALSE,
  sap_chieu BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Banner (
  ma_banner INT AUTO_INCREMENT PRIMARY KEY,
  ma_phim INT NOT NULL,
  hinh_anh VARCHAR(255),

  CONSTRAINT fk_banner_phim
    FOREIGN KEY (ma_phim)
    REFERENCES Phim(ma_phim)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE LichChieu (
  ma_lich_chieu INT AUTO_INCREMENT PRIMARY KEY,
  ma_rap INT NOT NULL,
  ma_phim INT NOT NULL,
  ngay_gio_chieu DATETIME NOT NULL,
  gia_ve INT NOT NULL,

  CONSTRAINT fk_lichchieu_rapphim
    FOREIGN KEY (ma_rap)
    REFERENCES RapPhim(ma_rap)
    ON DELETE CASCADE,

  CONSTRAINT fk_lichchieu_phim
    FOREIGN KEY (ma_phim)
    REFERENCES Phim(ma_phim)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Ghe (
  ma_ghe INT AUTO_INCREMENT PRIMARY KEY,
  ten_ghe VARCHAR(50) NOT NULL,
  loai_ghe VARCHAR(50),
  ma_rap INT NOT NULL,

  CONSTRAINT fk_ghe_rapphim
    FOREIGN KEY (ma_rap)
    REFERENCES RapPhim(ma_rap)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE NguoiDung (
  tai_khoan INT AUTO_INCREMENT PRIMARY KEY,
  ho_ten VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  so_dt VARCHAR(20),
  mat_khau VARCHAR(255) NOT NULL,
  loai_nguoi_dung VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE DatVe (
  tai_khoan INT NOT NULL,
  ma_lich_chieu INT NOT NULL,
  ma_ghe INT NOT NULL,

  PRIMARY KEY (tai_khoan, ma_lich_chieu, ma_ghe),

  CONSTRAINT fk_datve_nguoidung
    FOREIGN KEY (tai_khoan)
    REFERENCES NguoiDung(tai_khoan)
    ON DELETE CASCADE,

  CONSTRAINT fk_datve_lichchieu
    FOREIGN KEY (ma_lich_chieu)
    REFERENCES LichChieu(ma_lich_chieu)
    ON DELETE CASCADE,

  CONSTRAINT fk_datve_ghe
    FOREIGN KEY (ma_ghe)
    REFERENCES Ghe(ma_ghe)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO HeThongRap (ma_he_thong_rap, ten_he_thong_rap, logo) VALUES
(1, 'CGV', 'cgv.png'),
(2, 'Lotte Cinema', 'lotte.png');

INSERT INTO CumRap (ma_cum_rap, ten_cum_rap, dia_chi, ma_he_thong_rap) VALUES
(1, 'CGV Vincom Đồng Khởi', '72 Lê Thánh Tôn, Q1', 1),
(2, 'CGV Aeon Tân Phú', '30 Bờ Bao Tân Thắng', 1),
(3, 'Lotte Nowzone', '235 Nguyễn Văn Cừ', 2);

INSERT INTO RapPhim (ma_rap, ten_rap, ma_cum_rap) VALUES
(1, 'Phòng 1', 1),
(2, 'Phòng 2', 1),
(3, 'Phòng 1', 2),
(4, 'Phòng 1', 3);

INSERT INTO Phim
(ma_phim, ten_phim, trailer, hinh_anh, mo_ta, ngay_khoi_chieu, danh_gia, hot, dang_chieu, sap_chieu)
VALUES
(1001, 'Avengers: Endgame', 'trailer1.mp4', 'avengers.jpg', 'Phim siêu anh hùng', '2024-01-01', 9, 1, 1, 0),
(1002, 'Spider-Man', 'trailer2.mp4', 'spiderman.jpg', 'Người nhện', '2024-02-01', 8, 0, 1, 0);

INSERT INTO Banner (ma_banner, ma_phim, hinh_anh) VALUES
(1, 1001, 'banner1.jpg'),
(2, 1002, 'banner2.jpg');

INSERT INTO LichChieu
(ma_lich_chieu, ma_rap, ma_phim, ngay_gio_chieu, gia_ve)
VALUES
(1, 1, 1001, '2024-06-10 18:00:00', 90000),
(2, 2, 1001, '2024-06-10 20:00:00', 100000),
(3, 3, 1002, '2024-06-11 19:00:00', 85000);

INSERT INTO Ghe (ma_ghe, ten_ghe, loai_ghe, ma_rap) VALUES
(1, 'A1', 'Thuong', 1),
(2, 'A2', 'Thuong', 1),
(3, 'A3', 'VIP', 1),
(4, 'A1', 'Thuong', 2),
(5, 'A2', 'VIP', 2),
(6, 'A1', 'Thuong', 3),
(7, 'A2', 'VIP', 3);

