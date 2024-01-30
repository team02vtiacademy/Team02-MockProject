DROP DATABASE IF EXISTS QL_Ban_Ve_Xem_phim;

CREATE DATABASE IF NOT EXISTS QL_Ban_Ve_Xem_phim;

USE QL_Ban_Ve_Xem_phim;

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
	`user_id`		INT AUTO_INCREMENT PRIMARY KEY,
    `username`	 	VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH(`username`) >= 6 AND LENGTH(`username`) <= 50),
    `email`			VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH(`email`) >= 6 AND LENGTH(`email`) <= 50),
    `password` 		VARCHAR(800) NOT NULL,
    `firstName` 	NVARCHAR(50) NOT NULL,
	`lastName` 		NVARCHAR(50) NOT NULL,
    `role` 			ENUM('Admin','Manager','User') DEFAULT 'User',
    `status`		BOOLEAN DEFAULT 0 -- 0: Not Active, 1: Active
);

DROP TABLE IF EXISTS `Film`;
CREATE TABLE IF NOT EXISTS `Film`(
	`film_id`			INT AUTO_INCREMENT PRIMARY KEY,
    `name`				VARCHAR(100) NOT NULL UNIQUE KEY,
    `directors`			VARCHAR(50) NOT NULL CHECK (LENGTH(directors) >= 6 AND LENGTH(directors) <= 50),
    `actors`			VARCHAR(200) NOT NULL,
    `genre`				VARCHAR(100) NOT NULL,
    `duration`			VARCHAR(30) NOT NULL,
    `description`		TEXT NOT NULL,
    `release_date` 		DATETIME NOT NULL DEFAULT NOW(),
    `ticket_price`		INT NOT NULL,
    `poster`			TEXT NOT NULL,
    `creator_id` 		INT NOT NULL,
    FOREIGN KEY (`creator_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Film_Schedule`;
CREATE TABLE IF NOT EXISTS `Film_Schedule`(
	`schedule_id`		INT AUTO_INCREMENT PRIMARY KEY,
    `film_id`			INT,
    `seat_number`		INT CHECK (seat_number > 0 AND seat_number <= 100),
    `time_slot`			DATETIME NOT NULL,
    FOREIGN KEY (`film_id`) REFERENCES `Film`(`film_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Ticket`;
CREATE TABLE IF NOT EXISTS `Ticket`(
	`creator_id`		INT,
    `schedule_id`		INT,
    `quantity`			INT NOT NULL,
    `total`				INT NOT NULL, 
    `booking_date`		DATETIME DEFAULT NOW(),
    `status`			BOOLEAN DEFAULT 0,
    PRIMARY KEY (`creator_id`, `schedule_id`),
    FOREIGN KEY (`creator_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`schedule_id`) REFERENCES `Film_schedule`(`schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create table Registration_User_Token
DROP TABLE IF EXISTS 	`Registration_User_Token`;
CREATE TABLE IF NOT EXISTS `Registration_User_Token` ( 	
	id 				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`token`	 		CHAR(36) NOT NULL UNIQUE,
	`user_id` 		SMALLINT UNSIGNED NOT NULL,
	`expiryDate` 	DATETIME NOT NULL
);

-- Create table Reset_Password_Token
DROP TABLE IF EXISTS 	`Reset_Password_Token`;
CREATE TABLE IF NOT EXISTS `Reset_Password_Token` ( 	
	id 				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`token`	 		CHAR(36) NOT NULL UNIQUE,
	`user_id` 		SMALLINT UNSIGNED NOT NULL,
	`expiryDate` 	DATETIME NOT NULL
);

-- password: 123456
INSERT INTO `User` (`username`, `email`, `password`, `firstname`, `lastname`, `role`, `status`)
VALUES				('ducanh',    	'ducanh0202@gmail.com', 	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Duc', 	'Anh', 		'Admin',  1),
					('ducchien', 	'ducchien@gmail.com',  	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Duc',  	'Chien', 	'Manager', 1),
                    ('tungha',   	'tungha@gmail.com',    	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Tung',   	'Ha', 		'Manager',  1),
                    ('thanhphat', 	'thanhphat@gmail.com', 	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Thanh', 	'Phat', 	'Manager', 1),
                    ('xuandung', 'xuandung@gmail.com', 	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Xuan', 	'Dung', 	'Manager', 1),
                    ('hongphong', 	'hongphong@gmail.com', 		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Hong', 	'A', 	'Manager', 1),
                    ('ngoloi', 		'ngoloi@gmail.com', 		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Ngo', 		'C', 		'Manager', 1),
                    ('nguyenvana', 	'nguyena@gmail.com', 		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nguyen', 	'A', 		'User', 1),
                    ('nguyenvanb', 	'nguyenb@gmail.com', 		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nguyen', 	'B', 		'User', 1);
                     
INSERT INTO `Film` (`name`, `directors`, `actors`, `genre`, `duration`, `description`, `release_date`, `ticket_price`, `poster`, `creator_id`)
VALUES				('Năm đêm kinh hoàng', 'Emma Tammi','Matthew Lillard, Josh Hutcherson, Mary Stuart Masterson', 'Kinh Dị', '110 phút', 'Nhân viên bảo vệ Mike bắt đầu làm việc tại Freddy Fazbear pizza...', '2024/01/30', 70000,'https://files.betacorp.vn/files/media%2fimages%2f2023%2f10%2f03%2f700x1000-5demkinhhoang-115804-031023-17.png' , 1),
					('Kị sĩ bóng đêm', 'Christopher Nolan', 'Christian Bale, Michael Caine, Heath Ledger, Aaron Eckhart', 'Hành động', '152 phút', 'Kị sĩ bóng đêm mở đầu bằng cuộc oanh tạc...', '2024/10/18', 70000,'https://upload.wikimedia.org/wikipedia/vi/2/2d/Poster_phim_K%E1%BB%B5_s%C4%A9_b%C3%B3ng_%C4%91%C3%AAm_2008.jpg', 1),
                    ('Wolfoo và hòn đảo kỳ bí', 'Phan Thị Thơ', 'Sony Minh Hiếu, Đạt Phi, Như Ý', 'Hài, Hoạt Hình', '100 phút', 'Câu chuyện xoay quanh nhân vật chính là chú sói nhỏ ...', '2024/10/13', 70000,'https://lh3.googleusercontent.com/fPt0RQveClt8enn7d__GuA6wVjx11DxnynGh92gaiGbNIulSrtVKRwWfUbNLlHaQJv6D3X8Lne4jfyEcqTxOf1LqjOGs7LPLcOh9xWh0qg=w622', 2),
                    ('Vầng trăng máu', 'Martin Scorsese', 'Leonardo DiCaprio, Robert De Niro, Lily Gladstone', 'Bí ẩn, Hồi hộp', '206 phút', 'Vào những năm 1920, các thành viên của khu tự trị Osage...', '2024/10/20', 70000,'https://upload.wikimedia.org/wikipedia/vi/thumb/f/fc/V%E1%BA%A7ng_tr%C4%83ng_m%C3%A1u_-_Official_Vietnam_poster.jpg/220px-V%E1%BA%A7ng_tr%C4%83ng_m%C3%A1u_-_Official_Vietnam_poster.jpg', 3),
                    ('Cô giáo em là số 1', 'Park Jin - pyo', 'Shin Hae-sun, Lee Jun-young, Cha Chung-hwa,...', 'Hài hước, Hành động', '112 phút', 'Si-min là một võ sĩ quyền anh đầy triển vọng nhưng đã từ bỏ quyền thi đấu tại kỳ Thế vận hội Olympic để lấy tiền trả nợ cho cha.', '2024/11/24', 70000, 'https://www.cgv.vn/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/r/s/rsz_aw-ctkc-700x1000.jpg', 1),
                    ('Biệt đội Marvel', 'Nia DaCosta', 'Brie Larson, Iman Vellani, Teyonah Parris, Zawe Ashton', 'Hành động, Phiêu lưu', '104 phút', 'Carol Danvers bị vướng vào sức mạnh của Kamala Khan và Monica Rambeau, buộc họ phải hợp tác cùng nhau để cứu vũ trụ.', '2024/11/10', 70000, 'https://photo-cms-anninhthudo.epicdn.me/w800/Uploaded/2024/xtsmr/2023_11_11/biet-doi-marvel-4583-8523.jpg', 1),
                    ('Quỷ Lùn Tinh Nghịch: Đồng Tâm Hiệp Nhạc', 'Tim Heitz', 'Anna Kendrick, Justin Timberlake, Troye Sivan', 'Phiêu lưu, Âm Nhạc', '92 phút', 'Sự xuất hiện đột ngột của John Dory, anh trai thất lạc đã lâu của Branch mở ra quá khứ bí mật được che giấu bấy lâu nay của Branch.', '2024/11/17', 70000, 'https://upload.wikimedia.org/wikipedia/vi/thumb/3/3a/TROLLS_3_Vietnam_poster.jpg/220px-TROLLS_3_Vietnam_poster.jpg', 1),
                    ('Đấu Trường Sinh Tử: Khúc Hát Của Chim Ca Và Rắn Độc', 'Francis Lawrence', 'Rachel Zegler, Hunter Schafer, Tom Blyth, Jason Schwartzman', 'Hành động, Phiêu lưu', '157 phút', 'Đấu Trường Sinh Tử: Khúc Hát Của Chim Ca Và Rắn Độc là phần tiền truyện của mạch truyện chính, lấy bối cảnh 64 năm trước phần phim đầu tiên.', '2024/11/17', 100000, 'https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/o/poster_payoff_1_.jpg',1);
                
INSERT INTO `Film_Schedule` (`film_id`, `seat_number`, `time_slot`)
VALUES							(1, 100, '2024/01/30'),
								(2, 50, '2024/01/31'),
								(3, 50, '2024/02/01'),
								(4, 70, '2024/02/03'),
								(2, 100, '2024/02/04'),
                                (3, 70, '2024/02/05'),
                                (6, 100, '2024/02/02'),
                                (4, 100, '2024/01/30');
                                
INSERT INTO `Ticket` (`creator_id`, `schedule_id`, `quantity`, `total`, `booking_date`, `status`)
VALUES				(8, 1, 2, 140000, '2024/10/30', 1),
					(8, 2, 1, 70000,  '2024/11/01', 1),
                    (8, 3, 2, 140000, '2024/11/03', 1),
                    (9, 4, 2, 140000, '2024/11/05', 1),
                    (9, 5, 1, 70000,  '2024/11/10', 1);
				