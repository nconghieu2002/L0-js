function createRandomId(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

function createUniqueId() {
  const createdIds = [];
  const createId = () => {
    const id = createRandomId(10);
    if (createdIds.includes(id)) {
      return createId();
    }
    createdIds.push(id);
    return id;
  };
  return createId;
}
const createId = createUniqueId();

function sumCounts(arr) {
  const totalCount = arr.reduce((sum, item) => sum + item.count, 0);
  return totalCount;
}

function createBill() {
  const firstName = document.querySelector("#first__name").value;
  const lastName = document.querySelector("#last__name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const homeNumber = document.querySelector("#home__number").value;
  const message = document.querySelector("#message").value;
  const province = document.querySelector("#province");
  const selectedProvince = province.options[province.selectedIndex].textContent;
  const district = document.querySelector("#district");
  const selectedDistrict = district.options[district.selectedIndex].textContent;
  const ward = document.querySelector("#ward");
  const selectedWard = ward.options[ward.selectedIndex].textContent;
  const currentDate = new Date();
  const isValid = Object.values(setInfo).every((value) => value === true);

  if (isValid) {
    const newBill = {
      id: createId(),
      fullName: `${firstName} ${lastName}`,
      email,
      phone,
      homeNumber,
      message,
      address: `${selectedWard}, ${selectedDistrict}, ${selectedProvince}`,
      date: currentDate.toLocaleDateString(),
      totalQuantity: sumCounts(getCart()),
      itemNumber: getCart().length,
    };
    console.log(newBill);
    alert("success");
    postDataToApi(newBill);
    window.location.href = "bill.html";
  }
}

const postDataToApi = async (newProduct) => {
  try {
    const response = await fetch(urlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi thêm đơn hàng:", error);
  }
};

const getDataFromApi = async () => {
  try {
    const response = await fetch(urlApi);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Lỗi khi lấy đơn hàng: " + error);
  }
};

async function renderDataFromApi() {
  const bill = document.querySelector(".content");
  const data = await getDataFromApi();
  if (bill) {
    bill.innerHTML = data
      .map((data) => {
        return `<div class="container">
          <div class="detail__wrapper">
            <div class="code">${data.id}</div>
            <button class="detail">
              Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                class="detail__icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
          <div class="name">${data.fullName}</div>
          <div class="date">${data.date}</div>
          <div class="number">${data.itemNumber}</div>
          <div class="quantity">${data.totalQuantity}</div>
          <div class="price">$${totalMap.get("sumPrice")}</div>
          <button class="return">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              class="return__btn"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>`;
      })
      .join("");
  }
}
renderDataFromApi();

// const deleteDataFromApi = async (id) => {
//   try {
//     const response = await fetch(`http://localhost:3000/products${id}`, {
//       method: "DELETE",
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Lỗi khi thêm đơn hàng:", error);
//   }
// };
