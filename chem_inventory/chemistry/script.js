function displayDate(date) {
  return date.toLocaleDateString(
    undefined,
    { day: 'numeric', month: 'long', year: 'numeric'}
  )
}


let getBarcode = document.querySelector(".bcnSubmit");
let getBarcodeIM = document.querySelector(".bcnImSubmit");
let barcode = document.querySelector(".barcodeNumber").value;
let barcodeIM = (barcodeIm = document.querySelector(".barcodeNumberIM").value);
let lotNumber = barcode.slice(18, 24);
let lotNumberIm = barcodeIm.slice(18, 26);
let expDateString = barcode.slice(26, 32);
let refNumber = barcode.slice(35, 43);
let refNumberIm = barcodeIm.slice(37, 45);
let month = expDateString.slice(2, 4);
let day = expDateString.slice(4, 7);
let year = expDateString.slice(0, 2);
let date = `${month}/${day}/${year}`;
let expireDate = new Date(date);
let expDateStringIm = barcodeIm.slice(28, 34);
let monthIm = expDateStringIm.slice(2, 4);
let dayIm = expDateStringIm.slice(4, 7);
let yearIm = expDateStringIm.slice(0, 2);
let dateIm = `${monthIm}/${dayIm}/${yearIm}`;
let expireDateIm = new Date(dateIm);
let boxNumber = document.querySelector("#numberBoxs").value;
let getTestInfo = document.querySelector("#addInventory");
let getTestInfoIm = document.querySelector("#addInventoryIm");

fetch('all').then(Response => Response.json())
.then((reagentData) => {
  let index = reagentData.findIndex(function (refChems, index) {
    return refChems.refChem === refNumber;
  });
  getBarcode.onclick = function getData() {
    barcode = document.querySelector(".barcodeNumber").value;
    let globalTradeNumber = barcode.slice(2, 16);
    lotNumber = barcode.slice(18, 24);
    expDateString = barcode.slice(26, 32);
    month = expDateString.slice(2, 4);
    day = expDateString.slice(4, 7);
    year = expDateString.slice(0, 2);
    date = `${month}/${day}/${year}`;
    expireDate = new Date(date);
    refNumber = barcode.slice(35, 43);
    document.querySelector("#refNum").innerHTML = refNumber;
    document.querySelector("#lotNumber").innerHTML = lotNumber;
    document.querySelector("#exDate").innerHTML = displayDate(expireDate);
  
    let index = reagentData.findIndex(function (refChems, index) {
      return refChems.refChem === refNumber;
    });
    console.log(index);
    if (index === -1) {
      document.querySelector("#test_name").innerHTML =
        "This test has not been entered yet. Please see program administrator.";
    } else {
      chemTestName = reagentData[index].name.toUpperCase();
      document.querySelector("#test_name").innerHTML = chemTestName;
      chemTestShortName = reagentData[index].shName;
      flexBox = reagentData[index].flexPerBox;
      document.querySelector("#flexPerBox").innerHTML = flexBox;
    }
  };

  let indexIm = reagentData.findIndex(function (refChems, index) {
    return refChems.refChem === refNumberIm;
  });
  getBarcodeIM.onclick = function getDataIM() {
    barcodeIm = document.querySelector(".barcodeNumberIM").value;
    let globalTradeNumberIm = barcodeIm.slice(2, 16);
    lotNumberIm = barcodeIm.slice(18, 26);
    expDateStringIm = barcodeIm.slice(28, 34);
    monthIm = expDateStringIm.slice(2, 4);
    dayIm = expDateStringIm.slice(4, 7);
    yearIm = expDateStringIm.slice(0, 2);
    dateIm = `${monthIm}/${dayIm}/${yearIm}`;
    expireDateIm = new Date(dateIm);
    refNumberIm = barcodeIm.slice(37, 45);
    console.log(lotNumberIm);
    console.log(expireDateIm);
  
    document.querySelector("#refNumIm").innerHTML = refNumberIm;
    document.querySelector("#lotNumberIm").innerHTML = lotNumberIm;
    document.querySelector("#exDateIm").innerHTML = displayDate(expireDateIm);
  
    let indexIm = reagentData.findIndex(function (refChems, index) {
      return refChems.refChem === refNumberIm;
    });
    console.log(indexIm);
    if (indexIm === -1) {
      document.querySelector("#test_name_im").innerHTML =
        "This test has not been entered yet. Please see program administrator.";
    } else {
      chemTestNameIm = reagentData[indexIm].name.toUpperCase();
      document.querySelector("#test_name_im").innerHTML = chemTestNameIm;
      chemTestShortNameIm = reagentData[indexIm].shName;
      flexBoxIm = reagentData[indexIm].flexPerBox;
      console.log(flexBoxIm );
      document.querySelector('#flexPerBoxIm').innerHTML = flexBoxIm;
    }
  };

});







// let testName = [
// //   {
//     lot: "291053",
//     shortName: "TP",
//     TestName: "Total Protein",
//     expireDate: "03/01/21",
//     refNumber: "11097604"
//   },
//   {
//     lot: "201138",
//     shortName: "Mg",
//     TestName: "Magnesium",
//     expireDate: "04/01/21"
//   },
//   {
//     lot: "78842292",
//     shortName: "Testo",
//     TestName: "Testosterone",
//     expireDate: "07/26/20"
//   }
// ];


getTestInfo.onclick = function getInfo() {
  boxNumber = document.querySelector("#numberBoxs").value;

  let addInfo = {
    lot: lotNumber,
    expire: displayDate(expireDate),
    testName: chemTestName,
    shortName: chemTestShortName,
    flexPerBox: flexBox,
    numOfBoxs: boxNumber
  };
  console.log(addInfo);
};

getTestInfoIm.onclick = function getInfoIm() {
  boxNumberIm = document.querySelector("#numberBoxsIm").value;

  let addInfoIm = {
    "lot": lotNumberIm,
    "expire": displayDate(expireDateIm),
    "testName": chemTestNameIm,
    "shortName": chemTestShortNameIm,
    "flexPerBox": flexBoxIm,
    "numOfBoxs": boxNumberIm
  };
  console.log(addInfoIm);
};