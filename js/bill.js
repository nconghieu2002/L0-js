const createRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 10000);
  const createdId = randomNumber.toString();
  return createdId;
};

const createUniqueId = () => {
  const createdIds = [];

  function createId() {
    const id = createRandomId();

    if (createdIds.includes(id)) {
      // Nếu ID đã tồn tại, gọi đệ quy để tạo ID mới
      return createId();
    }

    // Nếu ID chưa tồn tại, thêm vào danh sách createdIds và trả về ID
    createdIds.push(id);
    return id;
  }

  return createId;
};

const createId = createUniqueId();
console.log(createId()); // ID ngẫu nhiên duy nhất

