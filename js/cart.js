function renderProduct() {
  const listProducts = library.getCartProducts(
    library.getDataFromLS(keyLocalStorageListSP),
    library.getDataFromLS(keyLocalStorageItemCart)
  );
  const renderProduct = document.querySelector(".container__cart");

  if (renderProduct) {
    renderProduct.innerHTML = listProducts
      .map((product) => {
        return `<div class="card__item">
        <div class="img__wrapper">
          <img class="image__product" src="${product.image}" alt="" />
          <div class="inf__product">
            <h3 class="name__product">${product.name}</h3>
            <div>Quantity: ${product.quantity}</div>
          </div>
        </div>
        <div class="quantity__wrapper">
          <button id="${product.id}" class="minus">-</button>
          <div class="quantity__product">${product.count}</div>
          <button id="${product.id}" class="plus">+</button>
        </div>
        <div class="subtotal__product">$${product.price}</div>
        <div class="total__product">
          $${library.totalPriceProduct(product.price, product.count)}
        </div>
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

function handleTotal() {
  const listProducts = library.getCartProducts(
    library.getDataFromLS(keyLocalStorageListSP),
    library.getDataFromLS(keyLocalStorageItemCart)
  );
  const sumPrice = listProducts.reduce((total, product) => {
    return total + library.totalPriceProduct(product.price, product.count);
  }, 0);
  totalMap.set("sumPrice", sumPrice);
  const total = document.querySelector(".total__bottom");
  if (total) {
    total.innerHTML = `Total: $${sumPrice}`;
  }
}

function emptyCart() {
  const emptyCart = document.querySelector(".empty__cart");
  const buyBtn = document.querySelector(".buy");
  const totalBottom = document.querySelector(".total__bottom");
  const data = library.getDataFromLS(keyLocalStorageItemCart);

  if (!data || data.length === 0) {
    if (emptyCart) {
      emptyCart.innerHTML = `
    <img
    src="https://th.bing.com/th/id/R.afa6a28d0ee0b5e7d55b7a5aecdfedec?rik=eOl3Z%2bU0XvmYlw&riu=http%3a%2f%2fiticsystem.com%2fimg%2fempty-cart.png&ehk=0omil1zRH7T3Pb5iTzvueamUQLSSb55vgY7dLFF8Bl8%3d&risl=&pid=ImgRaw&r=0"
    alt=""
    />`;
    }
    if (buyBtn) {
      buyBtn.style.display = "none";
    }
    if (totalBottom) {
      totalBottom.style.display = "none";
    }
  }
}

function handleModal() {
  const modal = document.querySelector(".background__modal");
  let buyButton = document.querySelector(".buy");
  let hideButton = document.querySelector(".modal__close");
  let cancelButton = document.querySelector(".modal__cancel");

  if (buyButton) {
    buyButton.addEventListener(
      "click",
      () => (modal.style.display = "inline-block")
    );
  }
  if (hideButton || cancelButton) {
    hideButton.addEventListener(
      "click",
      () => ((modal.style.display = "none"), clearInputs())
    );
    cancelButton.addEventListener(
      "click",
      () => ((modal.style.display = "none"), clearInputs())
    );
  }
}

function handleCountProduct() {
  const data = library.getDataFromLS(keyLocalStorageListSP);
  const cart = library.getDataFromLS(keyLocalStorageItemCart);
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
        if (productCount < productData.numberOf) {
          cart[cartIndex].count++;
          count[index].textContent = cart[cartIndex].count;
          subTotal[index].textContent = `$${library.totalPriceProduct(
            productData.price,
            cart[cartIndex].count
          )}`;
          setTimeout(handleTotal, 0);
        } else {
          alert("Vượt quá số lượng sản phẩm sẵn có");
        }
      }
      library.setDataToLS(keyLocalStorageItemCart, cart);
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
          subTotal[index].textContent = `$${library.totalPriceProduct(
            productData.price,
            cart[cartIndex].count
          )}`;
          setTimeout(handleTotal, 0);
        } else {
          alert("Sản phẩm đã đạt số lượng tối thiểu");
        }
      }
      library.setDataToLS(keyLocalStorageItemCart, cart);
    });
  });
}

function handleDeleteProduct(id) {
  const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này?");
  if (!confirmDelete) {
    return;
  }
  let cart = library.getDataFromLS(keyLocalStorageItemCart);
  let cartAfter = cart.filter((product) => product.id !== id);
  library.setDataToLS(keyLocalStorageItemCart, cartAfter);
  renderProduct();
  handleTotal();
  handleCountProduct();
  emptyCart();
}

(function () {
  renderProduct();
  handleCountProduct();
  handleTotal();
  emptyCart();
  handleModal();
})();
