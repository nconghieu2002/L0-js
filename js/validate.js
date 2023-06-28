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
}

function validateName() {
  const firstName = document.querySelector("#first__name");
  const lastName = document.querySelector("#last__name");
  const errFirstName = document.querySelector("#first__name__error");
  const errLastName = document.querySelector("#last__name__error");
  const nameRegex = /^[\p{L} ]+$/u;

  validateInput(
    firstName,
    errFirstName,
    nameRegex,
    setInfo,
    "isFirstName",
    "Vui lòng nhập Họ",
    "Họ không được chứa số hoặc ký tự đặc biệt"
  );
  validateInput(
    lastName,
    errLastName,
    nameRegex,
    setInfo,
    "isLastName",
    "Vui lòng nhập Tên",
    "Tên không được chứa số hoặc ký tự đặc biệt"
  );
}
validateName();

function validateEmail() {
  const email = document.querySelector("#email");
  const errEmail = document.querySelector("#email__error");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validateInput(
    email,
    errEmail,
    emailRegex,
    setInfo,
    "isEmail",
    "Vui lòng nhập Email",
    "Email không đúng cú pháp"
  );
}
validateEmail();

function validatePhone() {
  const phone = document.querySelector("#phone");
  const errPhone = document.querySelector("#phone__error");
  const phoneRegex = /^\d{10}$/;

  validateInput(
    phone,
    errPhone,
    phoneRegex,
    setInfo,
    "isPhone",
    "Vui lòng nhập Số điện thoại",
    "Số điện thoại không chính xác"
  );
}
validatePhone();

function validateHomeNumber() {
  const homeNumber = document.querySelector("#home__number");
  const errHomeNumber = document.querySelector("#home__number__error");
  const homeNumberRegex = /^[0-9]+$/;

  validateInput(
    homeNumber,
    errHomeNumber,
    homeNumberRegex,
    setInfo,
    "isHomeNumber",
    "Vui lòng nhập Số nhà",
    "Số nhà phải là số"
  );
}
validateHomeNumber();

function validateAddress() {
  const province = document.querySelector("#province");
  const district = document.querySelector("#district");
  const ward = document.querySelector("#ward");
  const provinceError = document.querySelector("#province__error");
  const districtError = document.querySelector("#district__error");
  const wardError = document.querySelector("#ward__error");

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
}
validateAddress();

function handleSubmit() {
  const submit = document.querySelector(".modal__submit");
  submit.addEventListener("click", (e) => {
    const firstName = document.querySelector("#first__name");
    const lastName = document.querySelector("#last__name");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const province = document.querySelector("#province");
    const district = document.querySelector("#district");
    const ward = document.querySelector("#ward");
    const homeNumber = document.querySelector("#home__number");

    if (firstName.value.trim() === "") {
      document.querySelector("#first__name__error").innerHTML =
        "Vui lòng nhập Họ";
    }
    if (lastName.value.trim() === "") {
      document.querySelector("#last__name__error").innerHTML =
        "Vui lòng nhập Tên";
    }
    if (email.value.trim() === "") {
      document.querySelector("#email__error").innerHTML = "Vui lòng nhập Email";
    }
    if (phone.value.trim() === "") {
      document.querySelector("#phone__error").innerHTML =
        "Vui lòng nhập Số điện thoại";
    }
    if (homeNumber.value.trim() === "") {
      document.querySelector("#home__number__error").innerHTML =
        "Vui lòng nhập Số nhà";
    }
    if (province.value === "--Chọn Tỉnh/ Thành phố--") {
      document.querySelector("#province__error").textContent =
        "Vui lòng chọn Tỉnh/ Thành phố";
    }
    if (district.value === "--Chọn Huyện/ Quận--") {
      document.querySelector("#district__error").textContent =
        "Vui lòng chọn Huyện/ Quận";
    }
    if (ward.value === "--Chọn Phường/ Xã--") {
      document.querySelector("#ward__error").textContent =
        "Vui lòng nhập Phường/ Xã";
    }
  });
}
handleSubmit();
