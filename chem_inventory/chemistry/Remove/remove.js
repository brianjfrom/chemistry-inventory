function displayDate(date) {
  return date.toLocaleDateString(
    undefined,
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
}

let getBarcode = document.querySelector(".bcnSubmit");
let getBarcodeIm = document.querySelector(".bcnSubmitIM");
// let getBarcodeCal = document.querySelector('.bcnSubmitCal');
let barcode = document.querySelector(".barcodeNumber").value;
let barcodeIM = document.querySelector(".barcodeNumberIM").value;
// let barcodeCal = document.querySelector(".barcodeNumberCal").value;
// let lotNumber = barcode.slice(18, 24);
// let lotNumberIm = barcodeIm.slice(18, 26);
// let expDateString = barcode.slice(26, 32);
// let refNumber = barcode.slice(35, 43);
// let refNumberIm = barcodeIm.slice(37, 45);
// let month = expDateString.slice(2, 4);
// let day = expDateString.slice(4, 7);
// let year = expDateString.slice(0, 2);
// let date = `${month}/${day}/${year}`;
// let expireDate = new Date(date);
// let expDateStringIm = barcodeIm.slice(28, 34);
// let monthIm = expDateStringIm.slice(2, 4);
// let dayIm = expDateStringIm.slice(4, 7);
// let yearIm = expDateStringIm.slice(0, 2);
// let dateIm = `${monthIm}/${dayIm}/${yearIm}`;
// let expireDateIm = new Date(dateIm);


fetch('../all').then(Response => Response.json())
  .then((reagentData) => {
    // let index = reagentData.findIndex(function (refChems, index) {
    //   return refChems.refChem == refNumber;
    // });
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

      chemTestName = reagentData[index].name.toUpperCase();
      console.log(chemTestName);
      document.querySelector("#test_name").innerHTML = chemTestName;
      chemTestShortName = reagentData[index].shName;
      flexBox = reagentData[index].flexPerBox;
      document.querySelector("#flexPerBox").innerHTML = flexBox;
      type = reagentData[index].type;

      setTimeout(function getInfo() {
        boxNumber = 1;

        let lot = lotNumber;
        let expire = date;
        let testName = reagentData[index].name.toUpperCase();
        console.log(testName);
        let shortName = reagentData[index].shName;
        let flexPerBox = reagentData[index].flexPerBox;
        let numOfBoxs = boxNumber;
        let pkgType = reagentData[index].type;
        let methodData = {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        fetch('/remove/' + testName + '.' + shortName + '.' + expire + '.' + lot + '.' + flexPerBox + '.' + numOfBoxs + "." + pkgType, methodData)
          .then(response => {
            console.log(response)
          })
        document.querySelector("#refNum").innerHTML = "";
        document.querySelector("#lotNumber").innerHTML = "";
        document.querySelector("#exDate").innerHTML = "";
        document.querySelector("#test_name").innerHTML = "";
        document.querySelector("#flexPerBox").innerHTML = "";
        // document.querySelector("#numberBoxs").value = "";
        document.querySelector(".barcodeNumber").value = "";
        document.querySelector('.note').innerHTML = '"Box Removed From Inventoy"'
        document.querySelector('.note').style.color = "red";
      }, 3000)
    }
    getBarcodeIm.onclick = function getDataIm() {
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
      console.log(refNumberIm);
      document.querySelector("#refNumIM").innerHTML = refNumberIm;
      document.querySelector("#lotNumberIM").innerHTML = lotNumberIm;
      document.querySelector("#exDateIM").innerHTML = displayDate(expireDateIm);
      document.querySelector('.noteIM').innerHTML = "";

      let indexIm = reagentData.findIndex(function (refChemsIm, index) {
        return refChemsIm.refChem == refNumberIm;
      });
      console.log(indexIm);

      chemTestNameIm = reagentData[indexIm].name.toUpperCase();
      console.log(chemTestNameIm);
      document.querySelector("#test_nameIM").innerHTML = chemTestNameIm;
      chemTestShortNameIm = reagentData[indexIm].shName;
      flexBoxIm = reagentData[indexIm].flexPerBox;
      document.querySelector("#flexPerBoxIM").innerHTML = flexBoxIm;
      typeIm = reagentData[indexIm].type;

      setTimeout(function getInfoIm() {
        boxNumberIm = 1;

        let lotIm = lotNumberIm;
        let expireIm = dateIm;
        let testNameIm = reagentData[indexIm].name.toUpperCase();
        console.log(testNameIm);
        let shortNameIm = reagentData[indexIm].shName;
        let flexPerBoxIm = reagentData[indexIm].flexPerBox;
        let numOfBoxsIm = boxNumberIm;
        let pkgTypeIm = reagentData[indexIm].typeIm;
        let methodDataIm = {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        fetch('/remove/' + testNameIm + '.' + shortNameIm + '.' + expireIm + '.' + lotIm + '.' + flexPerBoxIm + '.' + numOfBoxsIm + "." + pkgTypeIm, methodDataIm)
          .then(response => {
            console.log(response)
          })
        document.querySelector("#refNumIM").innerHTML = "";
        document.querySelector("#lotNumberIM").innerHTML = "";
        document.querySelector("#exDateIM").innerHTML = "";
        document.querySelector("#test_nameIM").innerHTML = "";
        document.querySelector("#flexPerBoxIM").innerHTML = "";
        // document.querySelector("#numberBoxs").value = "";
        document.querySelector(".barcodeNumberIM").value = "";
        document.querySelector('.noteIM').innerHTML = '"Box Removed From Inventoy"'
        document.querySelector('.noteIM').style.color = "red";
      }, 2000)
    }
  });