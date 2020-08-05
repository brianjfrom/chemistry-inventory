const inventoryContainer = document.querySelector('.inventory-data');
const inventoryTemplate = document.querySelector('.data-inventory-template');


getData().then(invData => {
    console.log(invData);
})

function displayDate(date) {
    return date.toLocaleDateString(
      undefined,
      { day: 'numeric', month: 'long', year: 'numeric' }
    )
  }

  function getData() {
    return fetch('../inventory').then(response => response.json())
    .then((inventoryData) => {
        return testData = inventoryData.sort(function(a, b) {
            let textA = a.testName.toUpperCase();
            let textB = b.testName.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        // console.log(testData);
        
    })
}

function defineArray(ary) {
    const selectedArray = ary[index];
}
            
            // newInventoryContainer.querySelector('#data-fullname').innerText = testData.testName;
            // newInventoryContainer.querySelector('#data-shortname').innerText = testData.shortName;
            // newInventoryContainer.querySelector('#data-expire-date').innerText = testData.expireDate;
            // newInventoryContainer.querySelector('#data-lot').innerText = testData.lot;
            // newInventoryContainer.querySelector('#dataType-number-boxs').innerText = testData.numOfBoxs;

            // function displayInventoryData() {
            //     for (let key = 0; key < testData.length; key++) {
            //         let newInventoryContainer = inventoryTemplate.textContent.cloneNode(true);
            //         newInventoryContainer.querySelector('#data-type').innerHTML = key.pkgType;
            //     }  
            // }      