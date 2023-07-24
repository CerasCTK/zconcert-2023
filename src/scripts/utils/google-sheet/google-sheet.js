import Sheet2API from "sheet2api-js/src/main";

const url = "https://sheet2api.com/v1/IdbFfjqdSsmJ/regularticketsshare";

export const createData = (fullName, phoneNumber, email, facebook, numOfLotus, numOfJasmine, numOfIris, totalPrice, paymentMethod) => {
  const currentDate = new Date();
  const dateTime = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" +  currentDate.getSeconds();
  return {
    DateTime: dateTime,
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