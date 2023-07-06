const setInfo = {
  isFirstName: false,
  isLastName: false,
  isEmail: false,
  isPhone: false,
  isProvince: false,
  isDistrict: false,
  isWard: false,
  isHomeNumber: false,
};

function validateInput(
  input,
  errorElement,
  validationRegex,
  setInfo,
  inputKey,
  errorMessage,
  errorMessageSecond
) {
  input.addEventListener("change", (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue === "") {
      errorElement.innerHTML = errorMessage;
    } else if (!validationRegex.test(inputValue)) {
      errorElement.innerHTML = errorMessageSecond;
    } else {
      errorElement.innerHTML = "";
      setInfo[inputKey] = true;
    }
  });

  input.addEventListener("input", () => {
    errorElement.innerHTML = "";
  });
}

(function validateName() {
  const firstName = document.querySelector("#first__name");
  const lastName = document.querySelector("#last__name");
  const errFirstName = document.querySelector("#first__name--error");
  const errLastName = document.querySelector("#last__name--error");
  const nameRegex = /^[\p{L} ]+$/u;

  validateInput(
    firstName,
    errFirstName,
    nameRegex,
    setInfo,
    "isFirstName",
    "Vui lòng nhập Họ",
    "Họ không được chứa chữ số hoặc ký tự đặc biệt"
  );
  validateInput(
    lastName,
    errLastName,
    nameRegex,
    setInfo,
    "isLastName",
    "Vui lòng nhập Tên",
    "Tên không được chứa chữ số hoặc ký tự đặc biệt"
  );
})();

(function validateEmail() {
  const email = document.querySelector("#email");
  const errEmail = document.querySelector("#email--error");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validateInput(
    email,
    errEmail,
    emailRegex,
    setInfo,
    "isEmail",
    "Vui lòng nhập Email",
    "Email phải có dạng: abc@def.xyz"
  );
})();

(function validatePhone() {
  const phone = document.querySelector("#phone");
  const errPhone = document.querySelector("#phone--error");
  const phoneRegex = /^\d{10}$/;

  validateInput(
    phone,
    errPhone,
    phoneRegex,
    setInfo,
    "isPhone",
    "Vui lòng nhập Số điện thoại",
    "Số điện thoại phải có 10 chữ số và bắt đầu bằng chữ số 0"
  );
})();

(function validateHomeNumber() {
  const homeNumber = document.querySelector("#home__number");
  const errHomeNumber = document.querySelector("#home__number--error");
  const homeNumberRegex = /[a-zA-Z0-9]/g;

  validateInput(
    homeNumber,
    errHomeNumber,
    homeNumberRegex,
    setInfo,
    "isHomeNumber",
    "Vui lòng nhập Số nhà",
    "Số nhà không được chứa ký tự đặc biệt"
  );
})();

(function validateAddress() {
  const province = document.querySelector("#province");
  const district = document.querySelector("#district");
  const ward = document.querySelector("#ward");
  const provinceError = document.querySelector("#province--error");
  const districtError = document.querySelector("#district--error");
  const wardError = document.querySelector("#ward--error");

  province.addEventListener("input", () => {
    provinceError.textContent = "";
    setInfo.isProvince = true;
  });
  district.addEventListener("input", () => {
    districtError.textContent = "";
    setInfo.isDistrict = true;
  });
  ward.addEventListener("input", () => {
    wardError.textContent = "";
    setInfo.isWard = true;
  });

  district.addEventListener("click", () => {
    if (province.value === "--Chọn Tỉnh/ Thành phố--") {
      provinceError.textContent = "Vui lòng chọn Tỉnh/ Thành phố trước";
    } else {
      provinceError.textContent = "";
    }
  });

  ward.addEventListener("click", () => {
    if (district.value === "--Chọn Huyện/ Quận--") {
      districtError.textContent = "Vui lòng chọn Huyện/ Quận trước";
    } else {
      districtError.textContent = "";
    }
  });
})();

(function handleSubmit() {
  const submit = document.querySelector(".modal__submit");
  submit.addEventListener("click", () => {
    const firstName = document.querySelector("#first__name");
    const lastName = document.querySelector("#last__name");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const province = document.querySelector("#province");
    const district = document.querySelector("#district");
    const ward = document.querySelector("#ward");
    const homeNumber = document.querySelector("#home__number");

    if (firstName.value.trim() === "") {
      document.querySelector("#first__name--error").innerHTML =
        "Vui lòng nhập Họ";
    }
    if (lastName.value.trim() === "") {
      document.querySelector("#last__name--error").innerHTML =
        "Vui lòng nhập Tên";
    }
    if (email.value.trim() === "") {
      document.querySelector("#email--error").innerHTML = "Vui lòng nhập Email";
    }
    if (phone.value.trim() === "") {
      document.querySelector("#phone--error").innerHTML =
        "Vui lòng nhập Số điện thoại";
    }
    if (homeNumber.value.trim() === "") {
      document.querySelector("#home__number--error").innerHTML =
        "Vui lòng nhập Số nhà";
    }
    if (province.value === "--Chọn Tỉnh/ Thành phố--") {
      document.querySelector("#province--error").textContent =
        "Vui lòng chọn Tỉnh/ Thành phố";
    }
    if (district.value === "--Chọn Huyện/ Quận--") {
      document.querySelector("#district--error").textContent =
        "Vui lòng chọn Huyện/ Quận";
    }
    if (ward.value === "--Chọn Phường/ Xã--") {
      document.querySelector("#ward--error").textContent =
        "Vui lòng nhập Phường/ Xã";
    }
  });
})();
