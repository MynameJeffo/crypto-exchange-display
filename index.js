const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
const path = require('path')
const mongoose = require("mongoose");

require('dotenv').config();

//connect to database

const url = "mongodb://@ds261486.mlab.com:61486/heroku_c09m21fr";

// mongoose.Promise = global.Promise;
const options = { user: 'cryptoUser', pass: 'Crypto4ever' };
mongoose.connect(url, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection errorrrr:'));

db.once('open', function() {
    // we're connected!
    console.log("We are connected!");
});

const CurrencySchema = new mongoose.Schema({
    currencyEngName: String,
    currencyChiName: String,
    BUY: String,
    SELL: String,
}, { collection : 'CryptoCurrencyTable' });

const Currency = mongoose.model("Currency", CurrencySchema);

// Create the server
const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))


// Serve our api route /cow that returns a custom talking text cow

app.get('/api/currency/get/', function (req, res, next) {
    try {
        Currency.find({}, function(error, currencies) {
            console.log("get currencyyy: ", currencies); 
            //Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
            res.json({ currencies })
        });
        console.log("get currency");
    } catch (err) {
        next(err)
    }
})

app.put('/api/currency/update/:id/:newValue/:fieldName', cors(), async (req, res, next) => {

    // console.log("req, _id -> ", req.params.id);
    // console.log("req, newValue -> ", req.params.newValue);
    // console.log("req, field -> ", req.params.fieldName);

    try {
        console.log("update currency");
        const id = req.params.id;
        const fieldName = req.params.fieldName;
        const newValue = req.params.newValue;

        let update = ({});
        switch(fieldName) {
            
            case "currencyEngName":          
                update = { currencyEngName : newValue }
                break;
            case "currencyChiName":
                update = { currencyChiName : newValue }
                break;
            case "BUY":
                update = { BUY : newValue }
                break;
            case "SELL":
                update = { SELL : newValue }
                break;
            default:
        }

        var options = { new: true };
        let result = await Currency.findByIdAndUpdate(id, update, options);
        console.log("result-> ", result);
        res.json({ result })

    } catch (err) {
        next(err)
    }
})

app.post('/api/currency/post/:price', function (req, res, next) {
    console.log("create currency");
    try {
        const text = req.params.price
        const moo = cowsay.say({ text })
        res.json({ moo })
    } catch (err) {
        next(err)
    }
})

app.delete('/api/currency/delete/', function (req, res, next) {
    console.log("delete currency");
    try {
        const moo = cowsay.say({ text: 'untz untz delete the currency' })
        res.json({ moo })
    } catch (err) {
        next(err)
    }
})



// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})