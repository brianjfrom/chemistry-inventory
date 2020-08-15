
function displayDate(date) {
  return date.toLocaleDateString(
    undefined,
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
}

let getBarcode = document.querySelector(".bcnSubmit");
let getBarcodeIM = document.querySelector(".bcnImSubmit");
let getBarcodeCal = document.querySelector('.bcnSubmitCal');
let barcode = document.querySelector(".barcodeNumber").value;
let barcodeIM = (barcodeIm = document.querySelector(".barcodeNumberIM").value);
let barcodeCal = document.querySelector(".barcodeNumberCal").value;
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
let getTestInfoCal = document.querySelector('#addInventoryCal');



fetch('all').then(Response => Response.json())
  .then((reagentData) => {
    let index = reagentData.findIndex(function (refChems, index) {
      return refChems.refChem == refNumber;
    });
    getBarcode.onclick = function getData() {
      barcode = document.querySelector(".barcodeNumber").value;
      let globalTradeNumber = barcode.slice(2, 16);
      lotNumber = barcode.slice(18, 24);
      expDateString = barcode.slice(26, 32);
      month = expDateString.slice(2, 4);
      day = expDateString.slice(4, 7);
      year = expDateString.slice(0, 2);
      date = `${month}-${day}-${year}`;
      expireDate = new Date(date);
      refNumber = barcode.slice(35, 43);
      console.log(refNumber);
      document.querySelector("#refNum").innerHTML = refNumber;
      document.querySelector("#lotNumber").innerHTML = lotNumber;
      document.querySelector("#exDate").innerHTML = displayDate(expireDate);
      document.querySelector('.note').innerHTML = "";


      let index = reagentData.findIndex(function (refChems, index) {
        return refChems.refChem == refNumber;
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
        type = reagentData[index].type;
        reference = reagentData[index].refChem
        console.log(reference);
      }
    };
    getTestInfo.onclick = function getInfo() {
      boxNumber = document.querySelector("#numberBoxs").value;

      let lot = lotNumber;
      let expire = date;
      let testName = chemTestName;
      console.log(testName);
      let shortName = chemTestShortName;
      let flexPerBox = flexBox;
      let numOfBoxs = boxNumber;
      let pkgType = type;
      let partNumber = reference;
      let methodData = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      fetch('/add/' + testName + '.' + shortName + '.' + expire + '.' + lot + '.' + flexPerBox + '.' + numOfBoxs + "." + pkgType + "."  + partNumber, methodData)
        .then(response => {
          console.log(response)
        })
      document.querySelector("#refNum").innerHTML = "";
      document.querySelector("#lotNumber").innerHTML = "";
      document.querySelector("#exDate").innerHTML = "";
      document.querySelector("#test_name").innerHTML = "";
      document.querySelector("#flexPerBox").innerHTML = "";
      document.querySelector("#numberBoxs").value = "";
      document.querySelector(".barcodeNumber").value = "";
      document.querySelector('.note').innerHTML = '"Inventory Added"'
      document.querySelector('.note').style.color = "red";
    }



    let indexIm = reagentData.findIndex(function (refChems, index) {
      return refChems.refChem == refNumberIm;
    });
    getBarcodeIM.onclick = function getDataIM() {
      barcodeIm = document.querySelector(".barcodeNumberIM").value;
      let globalTradeNumberIm = barcodeIm.slice(2, 16);
      lotNumberIm = barcodeIm.slice(18, 26);
      expDateStringIm = barcodeIm.slice(28, 34);
      monthIm = expDateStringIm.slice(2, 4);
      dayIm = expDateStringIm.slice(4, 7);
      yearIm = expDateStringIm.slice(0, 2);
      dateIm = `${monthIm}-${dayIm}-${yearIm}`;
      expireDateIm = new Date(dateIm);
      refNumberIm = barcodeIm.slice(37, 45);
      console.log(lotNumberIm);
      console.log(expireDateIm);

      document.querySelector("#refNumIm").innerHTML = refNumberIm;
      document.querySelector("#lotNumberIm").innerHTML = lotNumberIm;
      document.querySelector("#exDateIm").innerHTML = displayDate(expireDateIm);
      document.querySelector('.noteIm').innerHTML = "";

      let indexIm = reagentData.findIndex(function (refChems, index) {
        return refChems.refChem == refNumberIm;
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
        console.log(flexBoxIm);
        document.querySelector('#flexPerBoxIm').innerHTML = flexBoxIm;
        typeIm = reagentData[indexIm].type
        console.log(typeIm);
      }
    };






    getTestInfoIm.onclick = function getInfoIm() {
      boxNumberIm = document.querySelector("#numberBoxsIm").value;

      let lotIm = lotNumberIm;
      let expireIm = dateIm;
      let testNameIm = chemTestNameIm;
      console.log(testNameIm)
      let shortNameIm = chemTestShortNameIm;
      let flexPerBoxIm = flexBoxIm;
      let numOfBoxsIm = boxNumberIm;
      let pkgTypeIm = typeIm;
      let methodDataIm = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      fetch('/add/' + testNameIm + '.' + shortNameIm + '.' + expireIm + '.' + lotIm + '.' + flexPerBoxIm + '.' + numOfBoxsIm + "." + pkgTypeIm, methodDataIm)
        .then(response => {
          console.log(response)
        })
      document.querySelector("#refNumIm").innerHTML = "";
      document.querySelector("#lotNumberIm").innerHTML = "";
      document.querySelector("#exDateIm").innerHTML = "";
      document.querySelector("#test_name_Im").innerHTML = "";
      document.querySelector("#flexPerBoxIm").innerHTML = "";
      document.querySelector("#numberBoxsIm").value = "";
      document.querySelector(".barcodeNumberIm").value = "";
      document.querySelector('.noteIm').innerHTML = '"Inventory Added"'
      document.querySelector('.noteIm').style.color = "red";

    };

    getBarcodeCal.onclick = function getDataCal() {
      barcodeCalNotFixed = document.querySelector(".barcodeNumberCal").value;
      barcodeCal = barcodeCalNotFixed.replace( /\\/g, "");
      console.log(barcodeCal);
      let globalTradeNumberCal = barcodeCal.slice(2, 16);
      console.log(globalTradeNumberCal, "GTN");
      lotNumberCal = barcodeCal.slice(18, 24);
      console.log(lotNumberCal, 'lot');
      expDateStringCal = barcodeCal.slice(26, 32);
      console.log(expDateStringCal, 'exdate string');
      monthCal = expDateStringCal.slice(2, 4);
      console.log(monthCal, 'mon');
      dayCal = expDateStringCal.slice(4, 7);
      console.log(dayCal, 'day');
      yearCal = expDateStringCal.slice(0, 2);
      console.log(yearCal, 'year');
      dateCal = `${monthCal}-${dayCal}-${yearCal}`;
      console.log(dateCal, 'date');
      expireDateCal = new Date(dateCal);
      refNumberCal = barcodeCal.slice(35, 43);
      console.log(refNumberCal, 'refnumber')
      // console.log(lotNumberIm);
      // console.log(expireDateIm);

      document.querySelector("#refNumCal").innerHTML = refNumberCal;
      document.querySelector("#lotNumberCal").innerHTML = lotNumberCal;
      document.querySelector("#exDateCal").innerHTML = displayDate(expireDateCal);
      document.querySelector('.noteCal').innerHTML = "";

      let indexCal = reagentData.findIndex(function (refChems, index) {
        return refChems.refChem == refNumberCal;
      });
      console.log(indexCal);
      if (indexCal === -1) {
        document.querySelector("#test_nameCal").innerHTML =
          "This test has not been entered yet. Please see program administrator.";
      } else {
        chemTestNameCal = reagentData[indexCal].name.toUpperCase();
        document.querySelector("#test_nameCal").innerHTML = chemTestNameCal;
        chemTestShortNameCal = reagentData[indexCal].shName;
        flexBoxCal = reagentData[indexCal].flexPerBox;
        console.log(flexBoxCal);
        document.querySelector('#flexPerBoxCal').innerHTML = flexBoxCal;
        typeCal = reagentData[indexCal].type
        console.log(typeCal);
      }
    };
    getTestInfoCal.onclick = function getInfoCal() {
      boxNumberCal = document.querySelector("#numberBoxsCal").value;

      let lotCal = lotNumberCal;
      let expireCal = dateCal;
      let testNameCal = chemTestNameCal;
      console.log(testNameCal)
      let shortNameCal = chemTestShortNameCal;
      let flexPerBoxCal = flexBoxCal;
      let numOfBoxsCal = boxNumberCal;
      let pkgTypeCal = typeCal;
      let methodDataCal = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      fetch('/add/' + testNameCal + '.' + shortNameCal + '.' + expireCal + '.' + lotCal + '.' + flexPerBoxCal + '.' + numOfBoxsCal + "." + pkgTypeCal, methodDataCal)
        .then(response => {
          console.log(response)
        })
      document.querySelector("#refNumCal").innerHTML = "";
      document.querySelector("#lotNumberCal").innerHTML = "";
      document.querySelector("#exDateCal").innerHTML = "";
      document.querySelector("#test_nameCal").innerHTML = "";
      document.querySelector("#flexPerBoxCal").innerHTML = "";
      document.querySelector("#numberBoxsCal").value = "";
      document.querySelector(".barcodeNumberCal").value = "";
      document.querySelector('.noteCal').innerHTML = '"Inventory Added"'
      document.querySelector('.noteCal').style.color = "red";
    }
    
  });