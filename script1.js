document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const newUsername = document.getElementById("newUsername");
  const newPassword = document.getElementById("newPassword");

  // Ban đầu chỉ hiển thị form đăng ký
  loginForm.style.display = "none";
  registerForm.style.display = "block";

  // Xử lý sự kiện khi form đăng ký được submit
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (registerUser(newUsername.value, newPassword.value)) {
      alert("Đăng ký thành công. Vui lòng đăng nhập.");
      // Lưu thông tin đăng nhập vào localStorage
      localStorage.setItem("registeredUsername", newUsername.value);
      localStorage.setItem("registeredPassword", newPassword.value);
      // Chuyển đổi hiển thị giữa form đăng ký và đăng nhập
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    } else {
      alert("Không thể đăng ký. Tên người dùng có thể đã tồn tại.");
    }
  });

  // Xử lý sự kiện khi form đăng nhập được submit
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (checkLogin(username.value, password.value)) {
      // Đăng nhập thành công, chuyển hướng đến trang cá nhân và tổ chức
      window.location.href = "dashboard.html"; // Giả sử 'dashboard.html' là trang chứa các phần cá nhân và tổ chức
    } else {
      alert("Thông tin đăng nhập không chính xác.");
    }
  });

  // Hàm kiểm tra thông tin đăng nhập
  function checkLogin(username, password) {
    return (
      username === localStorage.getItem("registeredUsername") &&
      password === localStorage.getItem("registeredPassword")
    );
  }

  // Hàm đăng ký người dùng
  function registerUser(username, password) {
    // Kiểm tra xem người dùng đã tồn tại chưa
    if (localStorage.getItem("registeredUsername") === username) {
      return false; // Người dùng đã tồn tại
    } else {
      return true; // Đăng ký thành công
    }
  }
});
