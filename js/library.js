const library = (() => {
  const setDataToLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getDataFromLS = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  };

  const getDataFromApi = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  };

  const postDataToApi = async (data) => {
    try {
      const response = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  const deleteDataFromApi = async (id) => {
    const deleteUrl = `${urlApi}/${id}`;
    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  function getCartProducts(data, cart) {
    let listProducts = [];
    for (let i = 0; i < data.length; i++) {
      if (cart) {
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
    }
    return listProducts;
  }

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

  const totalPriceProduct = (price, count) => {
    return price * count;
  };
  
  const handleSum = (arr, property) => {
    if (Array.isArray(arr) && arr.length > 0) {
      if (typeof arr[0] === "number") {
        return arr.reduce((total, num) => total + num, 0);
      } else if (typeof arr[0] === "object" && property) {
        return arr.reduce((total, obj) => total + obj[property], 0);
      }
    }
    return 0;
  };

  return {
    setDataToLS,
    getDataFromLS,
    getDataFromApi,
    postDataToApi,
    deleteDataFromApi,
    getCartProducts,
    totalPriceProduct,
    createId,
    handleSum,
  };
})();
