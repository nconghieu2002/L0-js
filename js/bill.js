const createRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 10000);
  const createdId = randomNumber.toString();
  return createdId;
};

const createUniqueId = () => {
  const createdIds = [];
  const createId = () => {
    const id = createRandomId();
    if (createdIds.includes(id)) {
      return createId();
    }
    createdIds.push(id);
    return id;
  };
  return createId;
};
const createId = createUniqueId();

function createBill() {
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
      date: currentDate,
    };
    console.log(newBill);
  }
}
