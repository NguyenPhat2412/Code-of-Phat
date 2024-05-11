document.addEventListener("DOMContentLoaded", function () {
  // Biến cho phần cá nhân
  const savingsBtn = document.getElementById("savingsBtn");
  const investmentBtn = document.getElementById("investmentBtn");
  const spendingBtn = document.getElementById("spendingBtn");
  const interactionBtn = document.getElementById("interactionBtn");
  const personalContent = document.getElementById("personalContent");

  // Biến cho phần tổ chức
  const payrollBtn = document.getElementById("payrollBtn");
  const expensesBtn = document.getElementById("expensesBtn");
  const profitBtn = document.getElementById("profitBtn");
  const feeBtn = document.getElementById("feeBtn");
  const organizationContent = document.getElementById("organizationContent");

  // Biến cho phần tạo quỹ mới
  const createFundBtn = document.getElementById("createFundBtn");
  const fundList = document.getElementById("fundList");

  // Sự kiện khi nhấn nút tạo quỹ mới

  // Lấy dữ liệu quỹ từ local storage
  const funds = getFundData();

  // Hiển thị lịch sử giao dịch khi trang tải hoàn toàn
  showTransactionHistory();

  // Biến lưu trữ số tiền tiết kiệm
  let savingsAmount = 0;

  // Sự kiện khi nhấn nút Tiết kiệm
  savingsBtn.addEventListener("click", function () {
    displaySavings();
  });

  // Sự kiện khi nhấn nút Đầu tư
  investmentBtn.addEventListener("click", function () {
    displayInvestment();
  });
  // Sự kiện khi nhấn nút Chi tiêu
  spendingBtn.addEventListener("click", function () {
    createFundBtn.addEventListener("click", displaySpending);
    displaySpending();
  });

  // Sự kiện khi nhấn nút Tương tác
  interactionBtn.addEventListener("click", function () {
    displayInteraction();
  });

  // Sự kiện khi nhấn nút Chi trả lương
  payrollBtn.addEventListener("click", function () {
    displayPayroll();
  });

  // Sự kiện khi nhấn nút Đề xuất chi phí
  expensesBtn.addEventListener("click", function () {
    displayExpenses();
  });

  // Sự kiện khi nhấn nút Tính toán lợi nhuận
  profitBtn.addEventListener("click", function () {
    displayProfit();
  });

  // Sự kiện khi nhấn nút Thu phí
  feeBtn.addEventListener("click", function () {
    displayFee();
  });
  const tabs = document.querySelectorAll("nav ul li a");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function (event) {
      event.preventDefault();
      const activeTabs = document.querySelectorAll(".active");
      activeTabs.forEach(function (tab) {
        tab.classList.remove("active");
      });
      tab.classList.add("active");
      const href = tab.getAttribute("href");
      const activeTabContent = document.querySelector(href);
      document.querySelectorAll("section").forEach(function (section) {
        section.style.display = "none";
      });
      activeTabContent.style.display = "block";
    });
  });

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const newUsername = document.getElementById("newUsername");
  const newPassword = document.getElementById("newPassword");
  const personalSection = document.getElementById("personal");
  const organizationSection = document.getElementById("organization");

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
  function checkPIN(callback) {
    const storedPIN = localStorage.getItem("pin");
    const enteredPIN = prompt("Nhập PIN của bạn:");
    if (storedPIN === enteredPIN) {
      callback();
    } else {
      alert("PIN không chính xác. Vui lòng thử lại.");
    }
  }

  // Xử lý sự kiện khi người dùng rút tiền từ tài khoản tiết kiệm
  withdrawBtn.addEventListener("click", function () {
    // Kiểm tra PIN trước khi thực hiện giao dịch
    checkPIN(function () {
      if (savingsAmount > 0) {
        savingsStatus.textContent = `Bạn đã rút ${savingsAmount.toLocaleString()} VND từ tài khoản tiết kiệm.`;
        savingsAmount = 0;
      } else {
        savingsStatus.textContent =
          "Không có số tiền trong tài khoản tiết kiệm.";
      }
    });
  });

  // Xử lý sự kiện khi người dùng rút tiền từ tài khoản tiết kiệm
  withdrawBtn.addEventListener("click", function () {
    // Kiểm tra PIN trước khi thực hiện giao dịch
    checkPIN(function () {
      if (savingsAmount > 0) {
        savingsStatus.textContent = `Bạn đã rút ${savingsAmount.toLocaleString()} VND từ tài khoản tiết kiệm.`;
        savingsAmount = 0;
      } else {
        savingsStatus.textContent =
          "Không có số tiền trong tài khoản tiết kiệm.";
      }
    });
  });
  // Xử lý sự kiện khi form đăng nhập được submit
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (checkLogin(username.value, password.value)) {
      loginSuccess();
    } else {
      alert("Thông tin đăng nhập không chính xác.");
    }
  });

  // Hàm xử lý khi đăng nhập thành công
  function loginSuccess() {
    loginForm.reset();
    loginForm.style.display = "none";
    personalSection.style.display = "block";
    organizationSection.style.display = "block";
  }

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

  // Hàm tạo quỹ mới
  function createNewFund() {
    const newFundForm = `
      <div class="fund-container">
        <h3>Tạo quỹ mới</h3>
        <label for="fundName">Tên quỹ:</label>
        <input type="text" id="fundName" placeholder="Nhập tên quỹ">
        <label for="fundAmount">Số tiền bao gồm (VND):</label>
        <input type="number" id="fundAmount" placeholder="Nhập số tiền">
        <label for="fundPurpose">Mục đích sử dụng quỹ:</label>
        <input type="text" id="fundPurpose" placeholder="Nhập mục đích">
        <button id="createFundConfirmBtn">Tạo quỹ</button>
      </div>`;
    const fundList = document.getElementById("fundList");

    fundList.innerHTML = newFundForm;

    const createFundConfirmBtn = document.getElementById(
      "createFundConfirmBtn"
    );

    createFundConfirmBtn.addEventListener("click", function () {
      const fundName = document.getElementById("fundName").value.trim();
      const fundAmount = parseInt(
        document.getElementById("fundAmount").value.trim()
      );
      const fundPurpose = document.getElementById("fundPurpose").value.trim();

      if (fundName === "" || isNaN(fundAmount) || fundPurpose === "") {
        alert("Vui lòng nhập đầy đủ thông tin.");
      } else {
        const fundMessage = `Bạn đã tạo quỹ "${fundName}" với số tiền ${fundAmount.toLocaleString()} VND với mục đích sử dụng "${fundPurpose}".`;
        alert(fundMessage);

        const successMessage = document.createElement("div");
        successMessage.classList.add("success-message");
        successMessage.textContent = "Quỹ đã được tạo thành công!";
        document.body.appendChild(successMessage);

        fundList.innerHTML = "";

        const fundData = {
          name: fundName,
          amount: fundAmount,
          purpose: fundPurpose,
        };
        saveFundData(fundData);
      }
    });
  }

  // Hàm hiển thị lịch sử giao dịch
  function showTransactionHistory() {
    if (funds.length > 0) {
      personalContent.innerHTML += "<h3>Lịch sử giao dịch:</h3>";
      funds.forEach((fund, index) => {
        personalContent.innerHTML += `<p>${index + 1}. Tên quỹ: ${
          fund.name
        }, Số tiền: ${fund.amount.toLocaleString()} VND, Mục đích: ${
          fund.purpose
        }</p>`;
      });
    } else {
      personalContent.innerHTML +=
        "<p>Chưa có giao dịch nào được thực hiện.</p>";
    }
  }

  // Hàm lưu dữ liệu quỹ vào local storage
  function saveFundData(fundData) {
    funds.push(fundData);
    localStorage.setItem("funds", JSON.stringify(funds));
  }

  // Hàm lấy dữ liệu quỹ từ local storage
  function getFundData() {
    return JSON.parse(localStorage.getItem("funds")) || [];
  }

  // Hàm hiển thị phần tiết kiệm
  function displaySavings() {
    personalContent.innerHTML = `
      <h3>Chức năng Tiết kiệm</h3>
      <label for="amountInput">Nhập số tiền muốn tiết kiệm:</label>
      <input type="number" id="amountInput" min="0" step="10000">
      <button id="depositBtn">Nạp tiền</button>
      <button id="withdrawBtn">Rút tiền</button>
      <div id="savingsStatus"></div>`;

    const amountInput = document.getElementById("amountInput");
    const depositBtn = document.getElementById("depositBtn");
    const withdrawBtn = document.getElementById("withdrawBtn");
    const savingsStatus = document.getElementById("savingsStatus");

    depositBtn.addEventListener("click", depositMoney);
    amountInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        depositMoney();
      }
    });

    function depositMoney() {
      const amount = parseInt(amountInput.value);
      if (!isNaN(amount) && amount > 0) {
        savingsAmount += amount;
        savingsStatus.textContent = `Bạn đã nạp ${amount.toLocaleString()} VND vào tài khoản tiết kiệm.`;
      } else {
        savingsStatus.textContent = "Vui lòng nhập một số tiền hợp lê.";
      }
    }

    withdrawBtn.addEventListener("click", function () {
      if (savingsAmount > 0) {
        savingsStatus.textContent = `Bạn đã rút ${savingsAmount.toLocaleString()} VND từ tài khoản tiết kiệm.`;
        savingsAmount = 0;
      } else {
        savingsStatus.textContent =
          "Không có số tiền trong tài khoản tiết kiệm.";
      }
    });
  }

  // Các hàm hiển thị cho các phần còn lại: Đầu tư, Chi tiêu, Tương tác, Chi trả lương, Đề xuất chi phí, Tính toán lợi nhuận, Thu phí
  // Bạn có thể thêm các hàm hiển thị tương tự như hàm displaySavings ở trên
  // Hàm hiển thị phần đầu tư
  function displayInvestment() {
    personalContent.innerHTML =
      "<p>Chức năng Đầu tư: Bạn có thể đầu tư vào chứng khoán, quỹ đầu tư phát triển, vàng, v.v.</p>" +
      "<p>Phân tích giá trị và chỉ số phát triển của quỹ sẽ được hiển thị để đề xuất cho người dùng.</p>" +
      '<button id="analyzeBtn">Phân tích</button>';

    const analyzeBtn = document.getElementById("analyzeBtn");
    analyzeBtn.addEventListener("click", function () {
      analyzeInvestment()
        .then((result) => {
          personalContent.innerHTML +=
            "<p>Kết quả phân tích: " + result + "</p>";
        })
        .catch((error) => {
          personalContent.innerHTML +=
            "<p>Đã xảy ra lỗi trong quá trình phân tích: " + error + "</p>";
        });
    });
  }

  // Hàm hiển thị phần chi tiêu
  function displaySpending() {
    personalContent.innerHTML = `
    <h2>Chi tiêu</h2>
    <div class="button-container">
      <button id="createFundBtn">Tạo quỹ mới</button>
      <div id="fundList"></div>
    </div>
  `;
    // Sự kiện khi nhấn nút tạo quỹ mới
    const createFundBtn = document.getElementById("createFundBtn");
    createFundBtn.addEventListener("click", createNewFund);
  }

  // Hàm hiển thị phần tương tác
  function displayInteraction() {
    personalContent.innerHTML = `<h3>Chức năng Tương tác</h3>
    <p>Xem cách thực hiện quản lý quỹ của người dùng khác và gợi ý sử dụng dựa trên dữ liệu từ người dùng khác.</p>
    <button id="viewUserBtn">Xem người dùng khác</button>
    <button id="suggestBtn">Gợi ý sử dụng quỹ</button>`;
    const viewUserBtn = document.getElementById("viewUserBtn");
    viewUserBtn.addEventListener("click", function () {
      viewOtherUsers();
    });

    const suggestBtn = document.getElementById("suggestBtn");
    suggestBtn.addEventListener("click", function () {
      suggestFundUsage();
    });
  }
  function viewOtherUsers() {
    // Đoạn mã này có thể sẽ thực hiện xem cách quản lý quỹ của người dùng khác và hiển thị kết quả
    const userInteractionResult =
      "Xem cách thực hiện quản lý quỹ của người dùng khác sẽ được hiển thị ở đây.";
    personalContent.innerHTML += `<p>${userInteractionResult}</p>`;
  }

  // Hàm gợi ý sử dụng quỹ
  function suggestFundUsage() {
    // Đoạn mã này có thể sẽ thực hiện gợi ý sử dụng quỹ dựa trên dữ liệu từ người dùng khác và hiển thị kết quả
    const fundSuggestionResult =
      "Gợi ý sử dụng quỹ dựa trên dữ liệu từ người dùng khác sẽ được hiển thị ở đây.";
    personalContent.innerHTML += `<p>${fundSuggestionResult}</p>`;
  }

  // Hàm hiển thị phần chi trả lương
  function displayPayroll() {
    organizationContent.innerHTML = `
    <h3>Chức năng Chi trả lương</h3>
    <div id="payrollForm">
      <label for="employeeName">Tên nhân viên:</label>
      <input type="text" id="employeeName" placeholder="Nhập tên nhân viên">
      <label for="salaryAmount">Số lương (VND):</label>
      <input type="number" id="salaryAmount" placeholder="Nhập số lương">
      <button id="addSalaryBtn">Thêm lương</button>
      <div id="totalSalaries"></div>
    </div>
    <button id="calculateTotalBtn">Tính tổng lương</button>
    <div id="totalPayroll"></div>`;

    const payrollForm = document.getElementById("payrollForm");
    const totalSalaries = document.getElementById("totalSalaries");
    let salaries = [];

    document
      .getElementById("addSalaryBtn")
      .addEventListener("click", function () {
        const employeeName = document
          .getElementById("employeeName")
          .value.trim();
        const salaryAmount = parseInt(
          document.getElementById("salaryAmount").value.trim()
        );
        if (employeeName === "" || isNaN(salaryAmount)) {
          alert("Vui lòng nhập đầy đủ thông tin.");
        } else {
          salaries.push({ name: employeeName, salary: salaryAmount });
          totalSalaries.innerHTML += `<p>${employeeName}: ${salaryAmount.toLocaleString()} VND</p>`;
          document.getElementById("employeeName").value = "";
          document.getElementById("salaryAmount").value = "";
        }
      });

    document
      .getElementById("calculateTotalBtn")
      .addEventListener("click", function () {
        const total = salaries.reduce((acc, curr) => acc + curr.salary, 0);
        document.getElementById(
          "totalPayroll"
        ).textContent = `Tổng số lương cần chi trả: ${total.toLocaleString()} VND`;
      });
  }

  // Hàm hiển thị phần đề xuất chi phí
  function displayExpenses() {
    organizationContent.innerHTML = `
    <h3>Chức năng Đề xuất chi phí</h3>
    <div id="expensesForm">
      <label for="expenseType">Loại chi phí:</label>
      <select id="expenseType">
        <option value="production">Chi phí sản xuất</option>
        <option value="rent">Thuê mặt bằng</option>
        <option value="location">Vị trí địa lý</option>
      </select>
      <label for="expenseAmount">Số tiền (VND):</label>
      <input type="number" id="expenseAmount" placeholder="Nhập số tiền">
      <button id="addExpenseBtn">Thêm chi phí</button>
    </div>
    <div id="expensesList"></div>
  `;

    const expensesList = document.getElementById("expensesList");
    let expenses = [];

    document
      .getElementById("addExpenseBtn")
      .addEventListener("click", function () {
        const expenseType = document.getElementById("expenseType").value;
        const expenseAmount = parseInt(
          document.getElementById("expenseAmount").value.trim()
        );
        if (isNaN(expenseAmount)) {
          alert("Vui lòng nhập số tiền hợp lệ.");
        } else {
          expenses.push({ type: expenseType, amount: expenseAmount });
          expensesList.innerHTML += `<p>${expenseType}: ${expenseAmount.toLocaleString()} VND</p>`;
          document.getElementById("expenseAmount").value = ""; // Clear the input after adding
        }
      });
  }

  // Hàm hiển thị phần tính toán lợi nhuận
  function displayProfit() {
    organizationContent.innerHTML = `
    <h3>Chức năng Tính toán lợi nhuận</h3>
    <div id="profitForm">
      <label for="revenue">Doanh thu (VND):</label>
      <input type="number" id="revenue" placeholder="Nhập doanh thu">
      <label for="cost">Chi phí (VND):</label>
      <input type="number" id="cost" placeholder="Nhập chi phí">
      <button id="calculateProfitBtn">Tính lợi nhuận</button>
    </div>
    <div id="profitResult"></div>
  `;

    document
      .getElementById("calculateProfitBtn")
      .addEventListener("click", function () {
        const revenue = parseInt(
          document.getElementById("revenue").value.trim()
        );
        const cost = parseInt(document.getElementById("cost").value.trim());
        if (isNaN(revenue) || isNaN(cost)) {
          alert("Vui lòng nhập số liệu hợp lệ.");
        } else {
          const profit = revenue - cost;
          document.getElementById(
            "profitResult"
          ).textContent = `Lợi nhuận ròng: ${profit.toLocaleString()} VND`;
        }
      });
  }

  // Hàm hiển thị phần thu phí
  function displayFee() {
    organizationContent.innerHTML = `
    <h3>Chức năng Thu phí</h3>
    <div id="feeForm">
      <label for="capitalValue">Giá trị vốn hóa (VND):</label>
      <input type="number" id="capitalValue" placeholder="Nhập giá trị vốn hóa">
      <label for="feePercentage">Phần trăm phí (%):</label>
      <input type="number" id="feePercentage" placeholder="Nhập phần trăm phí">
      <button id="calculateFeeBtn">Tính phí</button>
    </div>
    <div id="feeResult"></div>
  `;

    document
      .getElementById("calculateFeeBtn")
      .addEventListener("click", function () {
        const capitalValue = parseInt(
          document.getElementById("capitalValue").value.trim()
        );
        const feePercentage = parseFloat(
          document.getElementById("feePercentage").value.trim()
        );
        if (isNaN(capitalValue) || isNaN(feePercentage)) {
          alert("Vui lòng nhập số liệu hợp lệ.");
        } else {
          const fee = (capitalValue * feePercentage) / 100;
          document.getElementById(
            "feeResult"
          ).textContent = `Phí cần thu: ${fee.toLocaleString()} VND`;
        }
      });
  }
});
