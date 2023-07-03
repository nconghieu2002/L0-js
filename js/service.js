const postProductsToApi = async (newProduct) => {
  const data = await library.postDataToApi(newProduct);
  return data;
};

const getProductsFromApi = async () => {
  const data = await library.getDataFromApi(urlApi);
  return data;
};

const deleteProductsFromApi = async (id) => {
  const data = await library.deleteDataFromApi(id);
  return data;
};
