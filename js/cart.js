function getCartProducts(data, cart) {
  let listProducts = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < cart.length; j++) {
      if (data[i].id === cart[j].id) {
        let product = {
          id: data[i].id,
          name: data[i].name,
          image: data[i].image,
          price: data[i].price,
          quantity: data[i].soLuong,
          count: cart[j].count,
        };
        listProducts.push(product);
      }
    }
  }
  return listProducts;
}

function totalPriceProduct(price, count) {
  return price * count;
}

function handleTotal() {
  const listProducts = getCartProducts(getListSP(), getCart());
  const sumPrice = listProducts.reduce((total, product) => {
    return total + totalPriceProduct(product.price, product.count);
  }, 0);
  totalMap.set("sumPrice", sumPrice);
  const total = document.querySelector(".total__bottom");
  if (total) {
    total.innerHTML = `Total: $${sumPrice}`;
  }
}
handleTotal();

function renderProduct() {
  const listProducts = getCartProducts(getListSP(), getCart());
  const renderProduct = document.querySelector(".container__cart");

  if (renderProduct) {
    renderProduct.innerHTML = listProducts
      .map((product) => {
        return `<div class="card__item">
                <div class="img__wrapper">
                <img
                class="image__product"
                src=${product.image}
                alt=""
                />
                <div class="inf__product">
                <h3 class="name__product">${product.name}</h3>
                <div>Quantity: ${product.quantity}</div>
                </div>
                </div>
                <div class="quantity__wrapper">
                <button id=${product.id} class="minus">-</button>
                <div class="quantity__product">${product.count}</div>
                <button id=${product.id} class="plus">+</button>
                </div>
                <div class="subtotal__product">$${product.price}</div>
                <div class="total__product">$${totalPriceProduct(
                  product.price,
                  product.count
                )}</div>
                <button onclick="handleDeleteProduct(${product.id})">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="clear__product"
                >
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                </svg>
                </button>
                </div>`;
      })
      .join("");
  }
}
renderProduct();

function handleModal() {
  const body = document.querySelector("body");
  const images = document.querySelectorAll(".image__product");
  const modal = document.querySelector(".modal");

  const showModal = () => {
    body.classList.add("body__opacity");
    images.forEach((image) => {
      image.classList.add("image__product__opacity");
    });
    modal.classList.add("modal__open");
  };

  const hideModal = () => {
    body.classList.remove("body__opacity");
    images.forEach((image) => {
      image.classList.remove("image__product__opacity");
    });
    modal.classList.remove("modal__open");
  };

  let buyButton = document.querySelector(".buy");
  if (buyButton) {
    buyButton.addEventListener("click", showModal);
  }
  let hideButton = document.querySelector(".modal__close");
  if (hideButton) {
    hideButton.addEventListener("click", hideModal);
  }
}
handleModal();

function handleCountProduct() {
  const data = getListSP();
  const cart = getCart();
  const plus = document.querySelectorAll(".plus");
  const minus = document.querySelectorAll(".minus");
  const count = document.querySelectorAll(".quantity__product");
  const subTotal = document.querySelectorAll(".total__product");

  plus.forEach((product, index) => {
    product.addEventListener("click", (e) => {
      const id = Number(e.target.id);
      const cartIndex = cart.findIndex((item) => item.id === id);

      if (cartIndex !== -1) {
        const productCount = cart[cartIndex].count;
        const productData = data.find((item) => item.id === id);

        if (productCount < productData.soLuong) {
          cart[cartIndex].count++;
          count[index].textContent = cart[cartIndex].count;
          subTotal[index].textContent = `$${totalPriceProduct(
            productData.price,
            cart[cartIndex].count
          )}`;
          setTimeout(handleTotal, 0);
        } else {
          alert("Vuot qua so luong");
        }
      }
      localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cart));
    });
  });

  minus.forEach((product, index) => {
    product.addEventListener("click", (e) => {
      const id = Number(e.target.id);
      const cartIndex = cart.findIndex((item) => item.id === id);

      if (cartIndex !== -1) {
        const productCount = cart[cartIndex].count;
        const productData = data.find((item) => item.id === id);

        if (productCount > 1) {
          cart[cartIndex].count--;
          count[index].textContent = cart[cartIndex].count;
          subTotal[index].textContent = `$${totalPriceProduct(
            productData.price,
            cart[cartIndex].count
          )}`;
          setTimeout(handleTotal, 0);
        } else {
          alert("het sp");
        }
      }
      localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cart));
    });
  });
}
handleCountProduct();

function handleDeleteProduct(id) {
  let cart = getCart();
  let cartAfter = cart.filter((product) => product.id !== id);
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cartAfter));
  renderProduct();
  handleTotal();
  handleCountProduct();
}
