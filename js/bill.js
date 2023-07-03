const createRandomId = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

const createUniqueId = () => {
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
};
const createId = createUniqueId();

function sumCounts(arr) {
  const totalCount = arr.reduce((sum, item) => sum + item.count, 0);
  return totalCount;
}

async function createBill() {
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
      totalPrice: totalMap.get("sumPrice"),
      listProducts: getCartProducts(getListSP(), getCart()),
    };
    alert("Mua hàng thành công");
    await postDataToApi(newBill);
    window.location.href = "bill.html";
    changeQuantityProduct();
  }
}

const changeQuantityProduct = () => {
  const products = getListSP();
  const cart = getCart();

  cart.forEach((cartItem) => {
    const product = products.find(
      (productItem) => productItem.id === cartItem.id
    );
    if (product) {
      product.soLuong -= cartItem.count;
    }
  });
  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(products));
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
};

const restoreQuantityProduct = async (id) => {
  const products = getListSP();
  const data = await getDataFromApi();
  const confirmDelete = confirm("Bạn có muốn xóa đơn hàng này?");
  if (!confirmDelete) {
    return;
  }

  data.forEach((bill) => {
    bill.listProducts.forEach((billProduct) => {
      if (bill.id === id) {
        const product = products.find(
          (productItem) => productItem.id === billProduct.id
        );
        if (product) {
          product.soLuong += billProduct.count;
        }
      }
    });
  });
  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(products));
  await deleteDataFromApi(id);
};

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
    console.log("Lỗi khi thêm đơn hàng:", error);
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

const deleteDataFromApi = async (id) => {
  try {
    const response = await fetch(`${urlApi}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Lỗi khi xóa đơn hàng:", error);
  }
};

const showDetail = async (id) => {
  const showPopup = document.querySelector(".popup");
  showPopup.style.display = "block";
  await renderDetailProduct(id);
};

const hideDetail = () => {
  const hidePopup = document.querySelector(".popup");
  hidePopup.style.display = "none";
};

const renderDetailProduct = async (id) => {
  const popupContainer = document.querySelector(".popup__container");
  const data = await getDataFromApi();
  const bill = data.find((bill) => bill.id === id);
  if (bill) {
    const productsHtml = bill.listProducts.map((product) => {
      return `<div class="popup__card">
      <div class="wrapper__card__name">
        <div><img class="popup__img" src="${product.image}" alt="" /></div>
        <div class="popup__name">${product.name}</div>
      </div>
      <div class="popup__quantity">${product.count}</div>
      <div class="popup__subtotal">$${product.price}</div>
      <div class="popup__total">$${product.price * product.count}</div>
      </div>`;
    });
    popupContainer.innerHTML = productsHtml.join("");
  }
};

async function renderDataFromApi() {
  const bill = document.querySelector(".bill__content");
  const data = await getDataFromApi();
  if (bill) {
    bill.innerHTML = data
      .map((data) => {
        return `<div>
        <div class="container">
          <div class="detail__wrapper">
            <div class="code">${data.id}</div>
            <button class="detail" onclick="showDetail('${data.id}')">
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
          <div class="price">$${data.totalPrice}</div>
          <button onclick="restoreQuantityProduct('${data.id}')" class="return">
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
                d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
              />
            </svg>
          </button>
        </div>
        <div class="popup">
          <div class="popup__title">
            <div class="popup__title__name">Product</div>
            <div class="popup__title__quantity">Quantity</div>
            <div class="popup__title__subtotal">Subtotal</div>
            <div class="popup__title__total">Total</div>
          </div>
          <div class="popup__container">
            
          </div>
          <div class="popup__close">
            <button class="popup__btn"onclick="hideDetail()">Đóng</button>
          </div>
        </div>
      </div>`;
      })
      .join("");
  }
}
renderDataFromApi();
