const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
// Create the server
const app = express()
// Serve our api route /cow that returns a custom talking text cow
app.get('/api/cow/:say', cors(), async (req, res, next) => {
  try {
    
    const text = req.params.say
    const moo = cowsay.say({ text })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})
// Serve our base route that returns a Hello World cow
app.get('/api/cow/', cors(), async (req, res, next) => {
  try {
    const moo = cowsay.say({ text: 'Hello World!' })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})

app.post('/api/currency/create/', function (req, res, next) {
    console.log("create currency");
    try {
        const moo = cowsay.say({ text: 'untz untz create the currency' })
        res.json({ moo })
    } catch (err) {
        next(err)
    }
})

app.put('/api/currency/update/', function (req, res, next) {
    console.log("update currency");
    try {
        const moo = cowsay.say({ text: 'untz untz update the currency' })
        res.json({ moo })
    } catch (err) {
        next(err)
    }
})

app.delete('/api/currency/delete/', function (req, res, next) {
    console.log("delete currency");
    try {
        const moo = cowsay.say({ text: 'untz untz update the currency' })
        res.json({ moo })
    } catch (err) {
        next(err)
    }
})

app.get('/api/currency/get/', function (req, res, next) {
    console.log("get currency");
    try {
        const moo = cowsay.say({ text: 'untz untz get the currency' })
        res.json({ moo })
    } catch (err) {
        next(err)
    }
})
// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})