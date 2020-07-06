let fs = require('fs');
let data = fs.readFileSync('reagent.json');
let reagents = JSON.parse(data);

let inventorySheet = fs.readFileSync('inventory.json');
let inventory = JSON.parse(inventorySheet);

console.log(inventory);

console.log('starting server');
let express = require('express');
const { finished } = require('stream');
let app = express();

let server = app.listen(3000, listen)

function listen() {
    console.log('listening at 3000')
}

app.use(express.static('chemistry'));

app.get('/add/:TestName.:shortName.:expireDate.:lot.:flexPerBox.:numOfBoxs', addArray);

function addArray(req, res) {
    let data = req.params;
    let testName = data.TestName;
    let shortName = data.shortName;
    let expireDate = data.expireDate;
    let lot = data.lot;
    let flexPerBox = Number(data.flexPerBox);
    let numOfBoxs = Number(data.numOfBoxs);
    let newInventory = {
        "testName": testName,
        "shortName": shortName,
        "expireDate": expireDate,
        "lot": lot,
        "flexPerBox": flexPerBox,
        "numOfBoxs": numOfBoxs
    };
    if (inventory.lot === lot) {
        console.log(inventory.numOfBoxs)
    }

    inventory.push(newInventory);
    fs.writeFile('inventory.json', JSON.stringify(inventory, null, 2), err =>{
        if (err) throw err;
        console.log("Inventory Added")
    });

app.get('/all', getAll); 

function getAll(req, res) {
    res.send(reagents);
};
}
app.get('/inventory', getInventory);

function getInventory(req, res) {
    res.send(inventory);
};