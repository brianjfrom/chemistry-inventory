let fs = require('fs');
let data = fs.readFileSync('reagent.json');
let reagents = JSON.parse(data);
let inventorySheet = fs.readFileSync('inventory.json');
let inventory = JSON.parse(inventorySheet);

// console.log(inventory);

console.log('starting server');
let express = require('express');
// const { finished } = require('stream');
// const { json } = require('express');
let app = express();

let server = app.listen(3000, listen)

function listen() {
    console.log('listening at 3000')
}

app.use(express.static('chemistry'));

app.post('/add/:TestName.:shortName.:expireDate.:lot.:flexPerBox.:numOfBoxs.:pkgType', addArray);

async function addArray(req, res) {
    let data = req.params;
    let testName = data.TestName;
    let shortName = data.shortName;
    let expireDate = data.expireDate;
    let lot = data.lot;
    let flexPerBox = Number(data.flexPerBox);
    let numOfBoxs = Number(data.numOfBoxs);
    let type = data.pkgType;

    let newInventory = {
        "testName": testName,
        "shortName": shortName,
        "pkgType": type,
        "expireDate": expireDate,
        "lot": lot,
        "flexPerBox": flexPerBox,
        "numOfBoxs": numOfBoxs
    };
    
    index = inventory.findIndex(function (lots, index) {
        return lots.lot === lot; 
    });
    if ([index] >= 0) {
        let newNumber = numOfBoxs;
        let originalNumber = inventory[index].numOfBoxs;
        let calNum = originalNumber + newNumber;

        inventory.splice([index], 1);
        fs.writeFile('inventory.json', JSON.stringify(inventory, null, 2), err =>{
            if (err) throw err;
        })
        let addToInventory = {
            "testName": testName,
            "shortName": shortName,
            "pkgType": type,
            "expireDate": expireDate,
            "lot": lot,
            "flexPerBox": flexPerBox,
            "numOfBoxs": calNum
        }
        await inventory.unshift(addToInventory);
        fs.writeFile('inventory.json', JSON.stringify(inventory, null, 2), err =>{
        if (err) throw err;
        console.log(testName, newNumber, "Boxes Added", new Date().toLocaleDateString());
        res.send("Number of Boxs updated")
    });
    } else {
        await inventory.push(newInventory);
        fs.writeFile('inventory.json', JSON.stringify(inventory, null, 2), err =>{
        if (err) throw err;
        console.log(testName, "New lot Added", new Date().toLocaleDateString());
        res.send("Inventory Added");
    });
    }
};
    
app.post('/remove/:TestName.:shortName.:expireDate.:lot.:flexPerBox.:numOfBoxs.:pkgType', removeArray)

async function removeArray(req, res) {
    let data = req.params;
    let testName = data.TestName;
    let shortName = data.shortName;
    let expireDate = data.expireDate;
    let lot = data.lot;
    let flexPerBox = Number(data.flexPerBox);
    let numOfBoxs = Number(data.numOfBoxs);
    let type = data.pkgType;

    let newInventory = {
        "testName": testName,
        "shortName": shortName,
        "pkgType": type,
        "expireDate": expireDate,
        "lot": lot,
        "flexPerBox": flexPerBox,
        "numOfBoxs": numOfBoxs
    };
    index = inventory.findIndex(function (lots, index) {
        return lots.lot === lot; 
    });
    console.log(index);
    let originalNumber = inventory[index].numOfBoxs;
    let fixedNumber = originalNumber - 1;

    inventory.splice([index], 1);
        fs.writeFile('inventory.json', JSON.stringify(inventory, null, 2), err =>{
            if (err) throw err;
        })
        let addToInventory = {
            "testName": testName,
            "shortName": shortName,
            "pkgType": type,
            "expireDate": expireDate,
            "lot": lot,
            "flexPerBox": flexPerBox,
            "numOfBoxs": fixedNumber
        }
        await inventory.unshift(addToInventory);
        fs.writeFile('inventory.json', JSON.stringify(inventory, null, 2), err =>{
        if (err) throw err;
        console.log(testName, "Box removed", new Date().toLocaleDateString());
    });
    res.send("Number of Boxs updated")
}
    

app.get('/all', getAll); 

function getAll(req, res) {
    res.send(reagents);
};

app.get('/inventory', getInventory);

function getInventory(req, res) {
    res.send(inventory);
};