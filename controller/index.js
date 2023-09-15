function getEle(selector) {
  return document.querySelector(selector);
}

function inputEmploy() {
  var taiKhoan = getEle("#tknv").value;
  var hoTen = getEle("#name").value;
  var email = getEle("#email").value;
  var matKhau = getEle("#password").value;
  var ngaySinh = getEle("#datepicker").value;
  var luongCoBan = getEle("#luongCB").value;
  var chucVu = getEle("#chucvu").value;
  var gioLam = getEle("#gioLam").value;

  return (nv = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngaySinh,
    luongCoBan,
    chucVu,
    gioLam
  ));
}

var dsnv = new DSNV();
var dataJson = localStorage.getItem("DSNV");
if (dataJson !== null) {
  dsnv.employ = JSON.parse(dataJson);

  for (var i = 0; i < dsnv.employ.length; i++) {
    dsnv.employ = JSON.parse(dataJson).map(function (item) {
      return new NhanVien(
        item.taiKhoan,
        item.hoTen,
        item.email,
        item.matKhau,
        item.ngaySinh,
        item.luongCoBan,
        item.chucVu,
        item.gioLam
      );
    });
  }
  renderTable(dsnv.employ);
}

// -------------------------------------------
// render table
function renderTable(arrList) {
  var htmlString = "";
  for (var i = 0; i < arrList.length; i++) {
    var nhanVien = arrList[i];
    htmlString += `<tr>
                <td>${nhanVien.taiKhoan}</td>
                <td>${nhanVien.hoTen}</td>
                <td>${nhanVien.email}</td>
                <td>${nhanVien.ngaySinh}</td>
                <td>${nhanVien.chucVu}</td>
                <td>${nhanVien.tongLuong()}</td>
                <td>${nhanVien.loaiNhanVien()}</td>
                <td>
                <div class="d-flex">
                <button class='btn btn-warning' data-toggle="modal" data-target="#myModal"onclick="editEmploy('${
                  nhanVien.taiKhoan
                }')" > Edit </button>
                <button class='btn btn-danger'onclick="deletEmploy('${
                  nhanVien.taiKhoan
                }')"> Delete </button>
                </div>
                </td>
                </tr>`;
  }
  getEle("#tableDanhSach").innerHTML = htmlString;
}

// -----------------------------------------
// reset
function resetBox() {
  getEle("#searchName").value = "";
}

function resetForm() {
  getEle("#tknv").disabled = false;
  getEle("#tknv").value = "";
  getEle("#name").value = "";
  getEle("#email").value = "";
  getEle("#password").value = "";
  getEle("#datepicker").value = "";
  getEle("#luongCB").value = "";
  getEle("#chucvu").value = "Chọn chức vụ";
  getEle("#gioLam").value = "";
  getEle(".sp-thongbao").style.display = "None";
}

getEle("#btnDong").onclick = function () {
  resetForm();
};

getEle("#btnThem").onclick = function () {
  resetForm();

  getEle("#btnThemNV").style.display = "block";
};

// ------------------------------------------------------
// check validation

getEle("#btnThemNV").onclick = function addEmploy() {
  var nv = inputEmploy();

  var valid =
    checkEmpty(nv.taiKhoan, "#tbTKNV", "Tài khoản không được để trống!") &&
    checkNumber(nv.taiKhoan, "#tbTKNV", "Mã nhân viên chỉ bao gồm ký tự số!") &&
    checkAcount(
      nv.taiKhoan,
      4,
      6,
      "#tbTKNV",
      "Mã Nhân viên bao gồm 4-6 ký tự!"
    ) &&
    checkDuplicate(
      nv.taiKhoan,
      dsnv.employ,
      "#tbTKNV",
      "Tài Khoản đã tồn tại!"
    );

  valid &=
    checkEmpty(nv.hoTen, "#tbTen", "Họ và tên không được để trống!") &&
    checkString(nv.hoTen, "#tbTen", "Họ và Tên chỉ bao gồm ký tự chữ!");

  valid &=
    checkEmpty(nv.email, "#tbEmail", "Email không được để trống!") &&
    checkEmail(nv.email, "#tbEmail", "Emai không đúng định dạng!");

  valid &=
    checkEmpty(nv.matKhau, "#tbMatKhau", "Mật khẩu không được để trống!") &&
    checkPass(
      nv.matKhau,
      "#tbMatKhau",
      "Mật khẩu gồm 6-10 ký tự, chứa ít nhất 1 ký tự in hoa, 1 ký tự số, 1 ký tự đặc biệt!"
    );

  valid &=
    checkEmpty(nv.ngaySinh, "#tbNgay", "Ngày không được để trống!") &&
    checkDate(nv.ngaySinh, "#tbNgay", "Ngày không đúng định dạng!");

  valid &=
    checkNumber(nv.luongCoBan, "#tbLuongCB", "Vui lòng nhập số lương!") &&
    checkEmptyNum(nv.luongCoBan, "#tbLuongCB", "Vui lòng nhập số lương!") &&
    checkLimit(
      nv.luongCoBan,
      1000000,
      20000000,
      "#tbLuongCB",
      "Mức lương không nằm trong chính sách (từ 1.000.000 - 20.000.000)"
    );

  valid &= checkOption(nv.chucVu, "#tbChucVu", "Vui lòng chọn chức vụ");

  valid &=
    checkNumber(nv.gioLam, "#tbGiolam", "Vui lòng nhập số giờ làm!") &&
    checkEmptyNum(nv.gioLam, "#tbGiolam", "Vui lòng nhập số giờ làm!") &&
    checkLimit(
      nv.gioLam,
      80,
      200,
      "#tbGiolam",
      "Số giờ làm không hợp lệ (từ 80 - 200 giờ)"
    );

  if (valid) {
    dsnv._addEmploy(nv);
    var data = JSON.stringify(dsnv.employ);
    localStorage.setItem("DSNV", data);
    renderTable(dsnv.employ);
    resetForm();
  }
};
// --------------------------------------
// edit
function editEmploy(taiKhoan) {
  var nv = dsnv._fillInfo(taiKhoan);

  if (nv) {
    getEle("#tknv").disabled = true;
    getEle("#tknv").value = nv.taiKhoan;
    getEle("#name").value = nv.hoTen;
    getEle("#email").value = nv.email;
    getEle("#password").value = nv.matKhau;
    getEle("#datepicker").value = nv.ngaySinh;
    getEle("#luongCB").value = nv.luongCoBan;
    getEle("#chucvu").value = nv.chucVu;
    getEle("#gioLam").value = nv.gioLam;
  }

  getEle("#btnThemNV").style.display = "none";
}

// ----------------------------------
// cập nhật
getEle("#btnCapNhat").onclick = function updateEmploy() {
  var nv = inputEmploy();

  var valid =
    checkEmpty(nv.hoTen, "#tbTen", "Họ và tên không được để trống!") &&
    checkString(nv.hoTen, "#tbTen", "Họ và Tên chỉ bao gồm ký tự chữ!");

  valid &=
    checkEmpty(nv.email, "#tbEmail", "Email không được để trống!") &&
    checkEmail(nv.email, "#tbEmail", "Emai không đúng định dạng!");

  valid &=
    checkEmpty(nv.matKhau, "#tbMatKhau", "Mật khẩu không được để trống!") &&
    checkPass(
      nv.matKhau,
      "#tbMatKhau",
      "Mật khẩu gồm 8-25 ký tự, chứa ít nhất 1 ký tự in hoa, 1 ký tự số, 1 ký tự đặc biệt!"
    );

  valid &=
    checkEmpty(nv.ngaySinh, "#tbNgay", "Ngày không được để trống!") &&
    checkDate(nv.ngaySinh, "#tbNgay", "Ngày không đúng định dạng!");

  valid &=
    checkNumber(nv.luongCoBan, "#tbLuongCB", "Vui lòng nhập số lương!") &&
    checkEmptyNum(nv.luongCoBan, "#tbLuongCB", "Vui lòng nhập số lương!") &&
    checkLimit(
      nv.luongCoBan,
      1000000,
      20000000,
      "#tbLuongCB",
      "Mức lương không nằm trong chính sách"
    );

  valid &= checkOption(nv.luongCoBan, "#tbChucVu", "Vui lòng chọn chức vụ");

  valid &=
    checkNumber(nv.gioLam, "#tbGiolam", "Vui lòng nhập số giờ làm!") &&
    checkEmptyNum(nv.gioLam, "#tbGiolam", "Vui lòng nhập số giờ làm!") &&
    checkLimit(nv.gioLam, 80, 200, "#tbGiolam", "Số giờ làm không hợp lệ");

  if (valid) {
    dsnv._update(nv);
    data = JSON.stringify(dsnv.employ);
    localStorage.setItem("DSNV", data);
    renderTable(dsnv.employ);
    resetForm();
  }
};

// ----------------------------------------------------
// Delete 
function deletEmploy(taiKhoan) {
    dsnv._delete(taiKhoan);
    data = JSON.stringify(dsnv.employ);
    localStorage.setItem("DSNV", data);
    renderTable(dsnv.employ);
};

// --------------------------------------------------
// Find 
getEle("#btnTimNV").onclick = function () {
    var textBox = getEle("#searchName").value.trim()?.toLowerCase();
    var result = [];
    if (textBox.length > 0) {
      result = dsnv.employ.filter(function (nv) {
        return nv.loaiNhanVien().toLowerCase().includes(textBox);
      });
      if (result == 0) {
        renderTable(dsnv.employ);
      } else {
        renderTable(result);
      }
    } else {
      renderTable(dsnv.employ);
    }
  
    resetBox();
};
