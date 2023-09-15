function NhanVien(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngaySinh,
  _luongCoBan,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.hoTen = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngaySinh = _ngaySinh;
  this.luongCoBan = _luongCoBan;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;

  // method
  this.tongLuong = function () {
    var luong = 0;
    if (this.chucVu === "Sếp") {
      luong = this.luongCoBan * 3;
    } else if (this.chucVu === "Trưởng Phòng") {
      luong = this.luongCoBan * 2;
    } else {
      luong = this.luongCoBan;
    }
    return luong.toLocaleString("vi", { style: "currency", currency: "VND" });
  };

  this.loaiNhanVien = function () {
    var xepLoai = "";
    if (this.gioLam >= 192) {
      xepLoai = "Nhân viên xuất sắc";
    } else if (this.gioLam >= 176) {
      xepLoai = "Nhân viên giỏi";
    } else if (this.gioLam >= 160) {
      xepLoai = "Nhân viên khá";
    } else {
      xepLoai = "Nhân viên trung bình";
    }

    return xepLoai;
  };
}
