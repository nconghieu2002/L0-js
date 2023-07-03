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

  return {
    setDataToLS,
    getDataFromLS,
    getDataFromApi,
    postDataToApi,
    deleteDataFromApi,
  };
})();
