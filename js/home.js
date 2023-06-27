// import { getCart, getListSP, keyLocalStorageItemCart } from "./index.js";
// const data = getListSP();

function getData() {
  const listProduct = document.querySelector(".container");
  const data = getListSP();

  listProduct.innerHTML = data
    .map((data) => {
      return ` 
      <div class="card__item">
        <div class="content">
          <img class="image" src="${data.image}" alt="" />
          <h3 class="name__shoes">${data.name}</h3>
          <div class="wrapper">
            <div class="price">$${data.price}</div>
            <div class="quantity">Quantity: ${data.soLuong}</div>
          </div>
        </div>
        <button>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="logo__card"
              id="${data.id}"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
          </svg>
        </button>
      </div>`;
    })
    .join("");
}
getData();

function addSP() {
  let cart = [];
  let listProducts = getCart();
  if (listProducts === null) {
    cart = [];
  } else {
    cart = listProducts;
  }
  let cardElement = document.querySelectorAll(".logo__card");

  cardElement.forEach((card) => {
    card.addEventListener("click", (e) => {
      let productCount = 1;
      let id = card.getAttribute("id");
      let productId = Number(id);
      let product = { id: productId, count: productCount };
      let existingProduct = cart.find((item) => item.id === productId);

      if (existingProduct) {
        existingProduct.count++;
      } else {
        cart.push(product);
      }
      localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cart));
    });
  });
}
addSP();
