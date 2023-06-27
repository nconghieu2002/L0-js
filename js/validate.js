// const setInfo = {
//   isFirstName: false,
//   isLastName: false,
//   isEmail: false,
//   isPhone: false,
//   isProvince: false,
//   isDistrict: false,
//   isWard: false,
//   isHomeNumber: false,
// };

// function validateName() {
//   const firstName = document.querySelector("#first__name");
//   const lastName = document.querySelector("#last__name");
//   const errFirstName = document.querySelector("#first__name__error");
//   const errLastName = document.querySelector("#last__name__error");
//   const regex = /^[\p{L} ]+$/u;

//   firstName.addEventListener("change", (e) => {
//     const inputValue = e.target.value;
//     if (inputValue.trim() === "") {
//       errFirstName.innerHTML = "Vui lòng nhập Họ";
//     } else if (!regex.test(inputValue)) {
//       errFirstName.innerHTML = "Họ không được chứa số hoặc ký tự đặc biệt";
//     } else {
//       errFirstName.innerHTML = "";
//       setInfo.isFirstName = true;
//     }
//   });

//   lastName.addEventListener("change", (e) => {
//     const inputValue = e.target.value;
//     if (inputValue.trim() === "") {
//       errLastName.innerHTML = "Vui lòng nhập Tên";
//     } else if (!regex.test(inputValue)) {
//       errLastName.innerHTML = "Tên không được chứa số hoặc ký tự đặc biệt";
//     } else {
//       errLastName.innerHTML = "";
//       setInfo.isLastName = true;
//     }
//   });
// }
// validateName();

// function validateEmail() {
//   const email = document.querySelector("#email");
//   const errEmail = document.querySelector("#email__error");
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   email.addEventListener("change", (e) => {
//     const inputValue = e.target.value;
//     if (inputValue.trim() === "") {
//       errEmail.innerHTML = "Vui lòng nhập Email";
//     } else if (!regex.test(inputValue)) {
//       errEmail.innerHTML = "Email không đúng cú pháp";
//     } else {
//       errEmail.innerHTML = "";
//       setInfo.isEmail = true;
//     }
//   });
// }
// validateEmail();

// function validatePhone() {
//   const phone = document.querySelector("#phone");
//   const errPhone = document.querySelector("#phone__error");
//   const regex = /^\d{10}$/;

//   phone.addEventListener("change", (e) => {
//     const inputValue = e.target.value;
//     if (inputValue.trim() === "") {
//       errPhone.innerHTML = "Vui lòng nhập Số điện thoại";
//     } else if (!regex.test(inputValue)) {
//       errPhone.innerHTML = "Số điện thoại không chính xác";
//     } else {
//       errPhone.innerHTML = "";
//       setInfo.isPhone = true;
//     }
//   });
// }
// validatePhone();

// function validateAddress() {
//   const province = document.querySelector("#province");
//   const district = document.querySelector("#district");
//   const ward = document.querySelector("#ward");
//   const provinceError = document.querySelector("#province__error");
//   const districtError = document.querySelector("#district__error");
//   const wardError = document.querySelector("#ward__error");

//   province.addEventListener("input", () => {
//     provinceError.textContent = "";
//     setInfo.isProvince = true;
//   });
//   district.addEventListener("input", () => {
//     districtError.textContent = "";
//     setInfo.isDistrict = true;
//   });
//   ward.addEventListener("input", () => {
//     setInfo.isWard = true;
//   });

//   district.addEventListener("click", () => {
//     if (province.value === "--Chọn Tỉnh/ Thành phố--") {
//       provinceError.textContent = "Vui lòng chọn Tỉnh/ Thành phố trước";
//     } else {
//       provinceError.textContent = "";
//     }
//   });

//   ward.addEventListener("click", () => {
//     if (district.value === "--Chọn Huyện/ Quận--") {
//       districtError.textContent = "Vui lòng chọn Huyện/ Quận trước";
//     } else {
//       districtError.textContent = "";
//     }
//   });
// }
// validateAddress();

// function validateHomeNumber() {
//   const homeNumber = document.querySelector("#home__number");
//   const errHomeNumber = document.querySelector("#home__number__error");
//   const regex = /^[0-9]+$/;

//   homeNumber.addEventListener("change", (e) => {
//     const inputValue = e.target.value;
//     if (inputValue.trim() === "") {
//       errHomeNumber.innerHTML = "Vui lòng nhập Số nhà";
//     } else if (!regex.test(inputValue)) {
//       errHomeNumber.innerHTML = "Số nhà phải là số";
//     } else {
//       errHomeNumber.innerHTML = "";
//       setInfo.isHomeNumber = true;
//     }
//   });
// }
// validateHomeNumber();

// function handleSubmit() {
//   const submit = document.querySelector(".modal__submit");
//   const allKeysTrue = Object.values(setInfo).every((value) => value === true);
// }

// function createBill() {
//   const firstName = document.querySelector("#first__name").value;
//   const lastName = document.querySelector("#last__name").value;
//   const email = document.querySelector("#email").value;
//   const phone = document.querySelector("#phone").value;
//   const homeNumber = document.querySelector("#home__number").value;
//   const province = document.querySelector("#province");
//   const selectedProvince = province.options[province.selectedIndex].textContent;
//   const district = document.querySelector("#district");
//   const selectedDistrict = district.options[district.selectedIndex].textContent;
//   const ward = document.querySelector("#ward");
//   const selectedWard = ward.options[ward.selectedIndex].textContent;

//   console.log(selectedProvince, selectedDistrict, selectedWard);
//   console.log(firstName);
//   console.log(firstName);
// }

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
      setInfo[input.id] = true;
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
    "Vui lòng nhập Họ",
    "Họ không được chứa số hoặc ký tự đặc biệt"
  );
  validateInput(
    lastName,
    errLastName,
    nameRegex,
    "Vui lòng nhập Tên",
    "Tên không được chứa số hoặc ký tự đặc biệt"
  );
}

function validateEmail() {
  const email = document.querySelector("#email");
  const errEmail = document.querySelector("#email__error");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validateInput(
    email,
    errEmail,
    emailRegex,
    "Vui lòng nhập Email",
    "Email không đúng cú pháp"
  );
}

function validatePhone() {
  const phone = document.querySelector("#phone");
  const errPhone = document.querySelector("#phone__error");
  const phoneRegex = /^\d{10}$/;

  validateInput(
    phone,
    errPhone,
    phoneRegex,
    "Vui lòng nhập Số điện thoại",
    "Số điện thoại không chính xác"
  );
}

function validateHomeNumber() {
  const homeNumber = document.querySelector("#home__number");
  const errHomeNumber = document.querySelector("#home__number__error");
  const homeNumberRegex = /^[0-9]+$/;

  validateInput(
    homeNumber,
    errHomeNumber,
    homeNumberRegex,
    "Vui lòng nhập Số nhà",
    "Số nhà phải là số"
  );
}

function validateAddress() {
  const province = document.querySelector("#province");
  const district = document.querySelector("#district");
  const ward = document.querySelector("#ward");
  const provinceError = document.querySelector("#province__error");
  const districtError = document.querySelector("#district__error");
  const wardError = document.querySelector("#ward__error");
  console.log(provinceError);

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

function handleSubmit() {
  const submit = document.querySelector(".modal__submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();

    let hasEmptyFields = false;

    // Kiểm tra các trường input trống và hiển thị thông báo lỗi tương ứng
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
      hasEmptyFields = true;
    }

    if (lastName.value.trim() === "") {
      document.querySelector("#last__name__error").innerHTML =
        "Vui lòng nhập Tên";
      hasEmptyFields = true;
    }

    if (email.value.trim() === "") {
      document.querySelector("#email__error").innerHTML = "Vui lòng nhập Email";
      hasEmptyFields = true;
    }

    if (phone.value.trim() === "") {
      document.querySelector("#phone__error").innerHTML =
        "Vui lòng nhập Số điện thoại";
      hasEmptyFields = true;
    }

    if (province.value === "--Chọn Tỉnh/ Thành phố--") {
      document.querySelector("#province__error").textContent =
        "Vui lòng chọn Tỉnh/ Thành phố";
      hasEmptyFields = true;
    }

    if (district.value === "--Chọn Huyện/ Quận--") {
      document.querySelector("#district__error").textContent =
        "Vui lòng chọn Huyện/ Quận";
      hasEmptyFields = true;
    }

    if (ward.value === "--Chọn Phường/ Xã--") {
      document.querySelector("#ward__error").textContent =
        "Vui lòng nhập Phường/ Xã";
      hasEmptyFields = true;
    }

    if (homeNumber.value.trim() === "") {
      document.querySelector("#home__number__error").innerHTML =
        "Vui lòng nhập Số nhà";
      hasEmptyFields = true;
    }

    // Nếu không có trường input nào trống, tiến hành xử lý submit
    if (!hasEmptyFields) {
      const isValid = Object.values(setInfo).every((value) => value === true);
      // Tiến hành submit form nếu tất cả các trường hợp kiểm tra điều kiện đúng
      if (isValid) {
        // Thực hiện submit form ở đây
      }
    }
  });
}

// function createBill() {
//   const firstName = document.querySelector("#first__name").value;
//   const lastName = document.querySelector("#last__name").value;
//   const email = document.querySelector("#email").value;
//   const phone = document.querySelector("#phone").value;
//   const homeNumber = document.querySelector("#home__number").value;
//   const province = document.querySelector("#province");
//   const selectedProvince = province.options[province.selectedIndex].textContent;
//   const district = document.querySelector("#district");
//   const selectedDistrict = district.options[district.selectedIndex].textContent;
//   const ward = document.querySelector("#ward");
//   const selectedWard = ward.options[ward.selectedIndex].textContent;

//   console.log(selectedProvince, selectedDistrict, selectedWard);
//   console.log(firstName);
//   console.log(firstName);
// }

// Gọi các hàm validation
validateName();
validateEmail();
validatePhone();
validateAddress();
validateHomeNumber();
// handleSubmit();
