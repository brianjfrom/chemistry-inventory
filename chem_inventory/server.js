let fs = require('fs');
let data = fs.readFileSync('reagent.json');
let reagents = JSON.parse(data);
let inventorySheet = fs.readFileSync('inventory.json');
let inventory = JSON.parse(inventorySheet);

// console.log(inventory);

console.log('starting server');
let express = require('express');
const { finished } = require('stream');
const { json } = require('express');
let app = express();

let server = app.listen(3000, listen)

function listen() {
    console.log('listening at 3000')
}

app.use(express.static('chemistry'));

app.post('/add/:TestName.:shortName.:expireDate.:lot.:flexPerBox.:numOfBoxs', addArray);

let nuumOfBoxs = ""
function addArray(req, res) {
    let data = req.params;
    let testName = data.TestName;
    let shortName = data.shortName;
    let expireDate = data.expireDate;
    let lot = data.lot;
    let flexPerBox = Number(data.flexPerBox);
    numOfBoxs = Number(data.numOfBoxs);

    let newInventory = {
        "testName": testName,
        "shortName": shortName,
        "expireDate": expireDate,
        "lot": lot,
        "flexPerBox": flexPerBox,
        "numOfBoxs": numOfBoxs
    };
    
    index = inventory.findIndex(function (lots, index) {
        return lots.lot === lot; 
    });
    console.log(index)
    if ([index] >= 0) {
        console.log(numOfBoxs, "numOfBoxs");
        let newNumber = numOfBoxs;
        console.log(numOfBoxs);  
        let originalNumber = inventory[index].numOfBoxs;
        console.log(originalNumber, "orig of boxs");
        
        console.log(newNumber, "new num of box")
        let calNum = originalNumber + newNumber;
        console.log(calNum, "cal num of box")

        let spliceIndex = inventory.splice([index]);
        fs.writeFile('inventory.json', JSON.stringify(spliceIndex, null, 2), err =>{
            if (err) throw err;
            console.log(inventory)
        })
        console.log([index], 'splice index number')
        let addToInventory = {
            "testName": testName,
            "shortName": shortName,
            "expireDate": expireDate,
            "lot": lot,
            "flexPerBox": flexPerBox,
            "numOfBoxs": calNum
        }
        console.log([index], 'index after splice');
        // inventory.push(addToInventory);
        fs.writeFile('inventory.json', JSON.stringify(addToInventory, null, 2), err =>{
        if (err) throw err;
        res.send("Number of Boxs updated")
    });
    } else if ([index] === -1){
        inventory.push(newInventory);
        fs.writeFile('inventory.json', JSON.stringify(inventory, null, 2), err =>{
        if (err) throw err;
        res.send("Inventory Added");
    });
    // } else {
    //     res.send("unable to send to inventory at this time");
    }
};
    

    

app.get('/all', getAll); 

function getAll(req, res) {
    res.send(reagents);
    console.log(reagents);
};

app.get('/inventory', getInventory);

function getInventory(req, res) {
    res.send(inventory);
};