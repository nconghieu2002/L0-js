const handleProvince = async () => {
  const selectProvince = document.getElementById("province");
  const provinces = await library.getDataFromApi(
    "https://provinces.open-api.vn/api/p/"
  );

  provinces.forEach((province) => {
    let option = document.createElement("option");
    option.value = province.code;
    option.textContent = province.name;
    selectProvince.appendChild(option);
  });
};
handleProvince();

const handleDistrict = async () => {
  const selectDistrict = document.getElementById("district");
  const selectProvince = document.getElementById("province");
  const districts = await library.getDataFromApi(
    "https://provinces.open-api.vn/api/d/"
  );

  selectProvince.addEventListener("change", () => {
    selectDistrict.innerHTML = "<option>--Chọn Huyện/ Quận--</option>";
    districts.forEach((district) => {
      if (district.province_code === Number(selectProvince.value)) {
        let option = document.createElement("option");
        option.value = district.code;
        option.textContent = district.name;
        selectDistrict.appendChild(option);
      }
    });
  });
};
handleDistrict();

const handleWard = async () => {
  const selectWard = document.getElementById("ward");
  const selectDistrict = document.getElementById("district");
  const selectProvince = document.getElementById("province");
  const wards = await library.getDataFromApi(
    "https://provinces.open-api.vn/api/w/"
  );

  selectProvince.addEventListener("change", async () => {
    selectWard.innerHTML = "<option>--Chọn Phường/ Xã--</option>";
  });

  selectDistrict.addEventListener("change", async () => {
    wards.forEach((ward) => {
      if (ward.district_code === Number(selectDistrict.value)) {
        let option = document.createElement("option");
        option.value = ward.code;
        option.textContent = ward.name;
        selectWard.appendChild(option);
      }
    });
  });
};
handleWard();
