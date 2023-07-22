import Sheet2API from "sheet2api-js/src/main";

const url = "https://sheet2api.com/v1/WShxpglyTKNN/test";

export const createData = (fullName, phoneNumber, email, facebook, numOfLotus, numOfJasmine, numOfIris, totalPrice, paymentMethod) => {
  return {
    FullName: fullName,
    PhoneNumber: phoneNumber,
    Email: email,
    Facebook: facebook,
    Lotus: numOfLotus,
    Jasmine: numOfJasmine,
    Iris: numOfIris,
    Total: totalPrice,
    Payment: paymentMethod,
  };
}

export const writeToSheet = (newRow, options = {}, success, failure) => {
  Sheet2API.write(url, options, newRow)
    .then(result => success(result))
    .catch(err => failure(err));
}