const listData = [
  {
    id: 1,
    name: "Nike Air Force 1 Premium",
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/734229e4-3a86-4194-b142-38bd0015209b/air-force-1-shoes-pK50VL.png",
    price: 1000,
    soLuong: 10,
  },
  {
    id: 2,
    name: "Nike Air Max Pulse",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2e282edb-e916-48cb-8329-97497507ab19/air-max-pulse-shoes-QShhG8.png",
    price: 1200,
    soLuong: 10,
  },
  {
    id: 3,
    name: "Nike Zegama",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3129565d-096d-444b-9106-8fe8591e805e/zegama-trail-running-shoes-LhRsM7.png",
    price: 1300,
    soLuong: 10,
  },
  {
    id: 4,
    name: "Nike Pegasus Turbo",
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/8b495f8c-e9fc-4f7e-9f12-08f1541b723f/pegasus-turbo-next-nature-se-road-running-shoes-tHT957.png",
    price: 1400,
    soLuong: 10,
  },
  {
    id: 5,
    name: "Nike Air Max Impact 4",
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/8142d726-b5ac-4917-a60e-7e6e8889e766/air-max-impact-4-basketball-shoes-CcJxBx.png",
    price: 1500,
    soLuong: 10,
  },
  {
    id: 6,
    name: "Nike Pegasus 40 Premium",
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/7b12d5de-4b27-41ec-b05f-fa3bdb71e4d4/pegasus-40-road-running-shoes-ztffW8.png",
    price: 1600,
    soLuong: 10,
  },
  {
    id: 7,
    name: "Nike Pegasus Trail 4",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c42a4cc9-1672-4759-90b1-8baadd8a413b/pegasus-trail-4-trail-running-shoes-ccqgBb.png",
    price: 1700,
    soLuong: 10,
  },
  {
    id: 8,
    name: "Air Jordan 1 Elevate Low",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/34b64f8a-60fe-42d5-8724-ab5c303e62f5/air-jordan-1-elevate-low-shoes-XlkVrM.png",
    price: 1800,
    soLuong: 10,
  },
];

const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHITEMCART";
const urlApi = "http://localhost:3000/products";
const totalMap = new Map();

const upListSP = () => {
  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
};

const getListSP = () => {
  const data = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
  return data;
};

const getCart = () => {
  const cart = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
  return cart;
};

