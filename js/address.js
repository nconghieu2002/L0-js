const selectWard = document.getElementById("ward");
const selectDistrict = document.getElementById("district");
const selectProvince = document.getElementById("province");

const createOption = (value, text) => {
  let option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  return option;
};

(async function handleProvince() {
  const provinces = await library.getDataFromApi(
    "https://provinces.open-api.vn/api/p/"
  );

  provinces.forEach((province) => {
    const option = createOption(province.code, province.name);
    selectProvince.appendChild(option);
  });
})();

(async function handleDistrict() {
  const districts = await library.getDataFromApi(
    "https://provinces.open-api.vn/api/d/"
  );

  selectProvince.addEventListener("change", () => {
    selectDistrict.innerHTML = "<option>--Chọn Huyện/ Quận--</option>";
    districts.forEach((district) => {
      if (district.province_code === Number(selectProvince.value)) {
        const option = createOption(district.code, district.name);
        selectDistrict.appendChild(option);
      }
    });
  });
})();

(async function handleWard() {
  const wards = await library.getDataFromApi(
    "https://provinces.open-api.vn/api/w/"
  );

  selectProvince.addEventListener("change", async () => {
    selectWard.innerHTML = "<option>--Chọn Phường/ Xã--</option>";
  });
  selectDistrict.addEventListener("change", async () => {
    wards.forEach((ward) => {
      if (ward.district_code === Number(selectDistrict.value)) {
        const option = createOption(ward.code, ward.name);
        selectWard.appendChild(option);
      }
    });
  });
})();
