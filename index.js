const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
const path = require('path')

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/"

// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))


// Serve our api route /cow that returns a custom talking text cow

// Serve our base route that returns a Hello World cow
// app.get('/api/cow/', cors(), async (req, res, next) => {
//   try {
//     const moo = cowsay.say({ text: 'Hello World!' })
//     console.log("yr mum")
//     res.json({ moo })
//   } catch (err) {
//     next(err)
//   }
// })

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

app.get('/api/currency/update/:price', cors(), async (req, res, next) => {
    MongoClient.connect(url, function(err,db) {
        if(err) throw err;
        var dbo = db.db("heroku_c09m21fr");
        var query = { msg_to: "shehan" };
            dbo.collection("msg_table").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.render('community', { title: 'Community', "messages" : result, record_no : 1});
        });

    })

    try {
        console.log("update currency");
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

app.get('/api/currency/get/', function (req, res, next) {
    MongoClient.connect(url, function(err,db) {
        if(err) throw err;
        var dbo = db.db("heroku_c09m21fr");
        var query = { msg_to: "shehan" };
            dbo.collection("msg_table").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.render('community', { title: 'Community', "messages" : result, record_no : 1});
        });

    })
    
    try {
        console.log("get currency");
        const moo = cowsay.say({ text: 'gotta get get' })
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