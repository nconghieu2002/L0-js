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

function emptyCart() {
  const emptyCart = document.querySelector(".empty__cart");
  const data = getCart();
  if (!data || data.length === 0) {
    if (emptyCart) {
      emptyCart.innerHTML = `
    <img
    src="https://th.bing.com/th/id/R.afa6a28d0ee0b5e7d55b7a5aecdfedec?rik=eOl3Z%2bU0XvmYlw&riu=http%3a%2f%2fiticsystem.com%2fimg%2fempty-cart.png&ehk=0omil1zRH7T3Pb5iTzvueamUQLSSb55vgY7dLFF8Bl8%3d&risl=&pid=ImgRaw&r=0"
    alt=""
    />`;
    }
  }
}
emptyCart();

function renderProduct() {
  const listProducts = getCartProducts(getListSP(), getCart());
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
          $${totalPriceProduct(product.price, product.count)}
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
renderProduct();

function handleModal() {
  const modal = document.querySelector(".background__modal");
  let buyButton = document.querySelector(".buy");
  let hideButton = document.querySelector(".modal__close");

  if (buyButton) {
    buyButton.addEventListener(
      "click",
      () => (modal.style.display = "inline-block")
    );
  }
  if (hideButton) {
    hideButton.addEventListener(
      "click", 
      () => (modal.style.display = "none")
    );
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
          alert("Vượt quá số lượng sản phẩm sẵn có");
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
          alert("Sản phẩm đã đạt số lượng tối thiểu");
        }
      }
      localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cart));
    });
  });
}
handleCountProduct();

function handleDeleteProduct(id) {
  const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này?");
  if (!confirmDelete) {
    return;
  }
  let cart = getCart();
  let cartAfter = cart.filter((product) => product.id !== id);
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cartAfter));
  renderProduct();
  handleTotal();
  handleCountProduct();
  emptyCart();
}
