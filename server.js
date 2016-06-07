const express = require('express')
const path = require('path')
const app = module.exports = express()
const port = 3000

app.use(express.static('public'))
app.get('/index.js', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.js')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))

app.listen(port, (error, server) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Listening on http://0.0.0.0:%s/lol', port)
  }
})
