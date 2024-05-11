document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const showLoginFormLink = document.getElementById("showLoginForm");
  const showRegisterFormLink = document.getElementById("showRegisterForm");
  const alertBox = document.getElementById("alertBox");
  const alertMessage = document.getElementById("alertMessage");
  const closeAlertBtn = document.getElementById("closeAlertBtn");

  // Ẩn form đăng nhập ban đầu
  loginForm.style.display = "none";

  // Xử lý sự kiện khi click vào liên kết "Login"
  showLoginFormLink.addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    hideAlert(); // Ẩn thông báo khi chuyển sang form đăng nhập
  });

  // Xử lý sự kiện khi click vào liên kết "Register"
  showRegisterFormLink.addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    hideAlert(); // Ẩn thông báo khi chuyển sang form đăng ký
  });

  // Hàm đăng ký người dùng
  function registerUser(username, password) {
    // Kiểm tra xem username đã tồn tại chưa
    if (localStorage.getItem(username) !== null) {
      showAlert(
        "Tên người dùng đã tồn tại. Vui lòng chọn tên người dùng khác."
      );
      return false; // Username đã tồn tại
    } else {
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem(username, password);
      showAlert("Đăng ký thành công. Vui lòng đăng nhập.");
      return true; // Đăng ký thành công
    }
  }

  // Hàm kiểm tra thông tin đăng nhập
  function checkLogin(username, password) {
    // Kiểm tra xem username có tồn tại và password có đúng không
    return localStorage.getItem(username) === password;
  }

  // Xử lý sự kiện khi form đăng ký được submit
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    if (registerUser(newUsername, newPassword)) {
      // Đăng ký thành công, hiển thị form đăng nhập
      loginForm.style.display = "block";
      registerForm.style.display = "none";
    }
  });

  // Xử lý sự kiện khi form đăng nhập được submit
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (checkLogin(username, password)) {
      // Đăng nhập thành công, chuyển hướng đến trang dashboard
      window.location.href = "dashboard.html";
    } else {
      showAlert("Thông tin đăng nhập không chính xác.");
    }
  });

  // Hiển thị thông báo
  function showAlert(messageText) {
    alertMessage.innerText = messageText;
    alertBox.style.display = "block";
  }

  // Ẩn thông báo
  function hideAlert() {
    alertBox.style.display = "none";
  }

  // Xử lý sự kiện click vào nút đóng thông báo
  closeAlertBtn.addEventListener("click", function () {
    hideAlert();
  });
});
