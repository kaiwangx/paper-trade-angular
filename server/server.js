import express from "express"
import cors from "cors"
import fetch from 'node-fetch'

const app = express()
const port = 3000
const api_key = 'c84l0gqad3i9u79ha73g'

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// company's description
app.get('/description/:ticker', (req, res) => {
    fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${req.params["ticker"]}&token=${api_key}`)
        .then(response => response.json())
        .then(response => res.send(response))
})

// company's historical data
app.get('/historical_data/:ticker/:resolution/:from/:to', (req, res) => {
    fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${req.params["ticker"]}&resolution=${req.params["resolution"]}&from=${req.params["from"]}&to=${req.params["to"]}&token=${api_key}`)
        .then(response => response.json())
        .then(response => res.send(response))
})

// company's latest price
app.get('/latest_price/:ticker', (req, res) => {
    fetch(`https://finnhub.io/api/v1/quote?symbol=${req.params["ticker"]}&token=${api_key}`)
        .then(response => response.json())
        .then(response => res.send(response))
})

// autocomplete
app.get('/autocomplete/:query', (req, res) => {
    fetch(`https://finnhub.io/api/v1/search?q=${req.params["query"]}&token=${api_key}`)
        .then(response => response.json())
        .then(response => res.send(response))
})

// company's news
app.get('/news/:ticker/:from/:to', (req, res) => {
    fetch(`https://finnhub.io/api/v1/company-news?symbol=${req.params["ticker"]}&from=${req.params["from"]}&to=${req.params["to"]}&token=${api_key}`)
        .then(response => response.json())
        .then(response => res.send(response))
})

// company's recommendation trends
app.get('/recommendation/:ticker', (req, res) => {
    fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${req.params["ticker"]}&token=${api_key}`)
        .then(response => response.json())
        .then(response => res.send(response))
})

// company's social sentiment
app.get('/social_sentiment/:ticker', (req, res) => {
    fetch(`https://finnhub.io/api/v1/stock/social-sentiment?symbol=${req.params["ticker"]}&from=2022-01-01&token=${api_key}`)
        .then(response => response.json())
        .then(response => res.send(response))
})

// company's peers
app.get('/peers/:ticker', (req, res) => {
    fetch(`https://finnhub.io/api/v1/stock/peers?symbol=${req.params["ticker"]}&token=${api_key}`)
        .then(response => response.json())
        .then(response => res.send(response))
})

// company's earnings
// todo: replace null with 0
app.get('/earnings/:ticker', (req, res) => {
    fetch(`https://finnhub.io/api/v1/stock/earnings?symbol=${req.params["ticker"]}&token=${api_key}`)
        .then(response => response.json())
        .then(response => {
            Object.keys(response).forEach(function(key) {
                if(response[key] === null) {
                    response[key] = '0';
                }
            })
            res.send(response)
        })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})