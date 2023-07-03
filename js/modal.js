async function handleProvince() {
  try {
    const selectProvince = document.getElementById("province");
    const response = await fetch("https://provinces.open-api.vn/api/p/");

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    data.forEach((province) => {
      let option = document.createElement("option");
      option.value = province.code;
      option.textContent = province.name;
      selectProvince.appendChild(option);
    });
  } catch (error) {
    console.log("Có lỗi xảy ra: " + error);
  }
}
handleProvince();

async function handleDistrict() {
  const selectDistrict = document.getElementById("district");
  const selectProvince = document.getElementById("province");

  const fetchDistrict = async () => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/d/`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra: " + error);
    }
  };

  selectProvince.addEventListener("change", async () => {
    const districts = await fetchDistrict();
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
}
handleDistrict();

async function handleWard() {
  const selectWard = document.getElementById("ward");
  const selectDistrict = document.getElementById("district");
  const selectProvince = document.getElementById("province");

  const fetchWard = async () => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/w/`);
      selectWard.innerHTML = "<option>--Chọn Phường/ Xã--</option>";
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra: " + error);
    }
  };

  selectProvince.addEventListener("change", async () => {
    selectWard.innerHTML = "<option>--Chọn Phường/ Xã--</option>";
  });

  selectDistrict.addEventListener("change", async () => {
    const wards = await fetchWard();

    wards.forEach((ward) => {
      if (ward.district_code === Number(selectDistrict.value)) {
        let option = document.createElement("option");
        option.value = ward.code;
        option.textContent = ward.name;
        selectWard.appendChild(option);
      }
    });
  });
}
handleWard();
