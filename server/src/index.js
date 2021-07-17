const axios = require('axios')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')

const PORT = process.env.PORT || 9000

const app = express()

app.use(cors())
app.use(express.json())
// Helmet enhances API security
app.use(helmet())
app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, '..', 'build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

app.get('/api/v0', async (req, res, next) => {
  console.log('got message GET')
})

app.post('/api/v0', async (req, res, next) => {
  const {language, code} = req.body
  console.log(`got language: ${language}, code: ${code}`)
  const exec_req = {
    "language": "python3",
    "version": "3.9.4",
    "files": [
      {
        "name": "my_cool_code.js",
        "content": code,
      }
    ],
    "stdin": "",
    "compile_timeout": 10000,
    "run_timeout": 3000,
    "compile_memory_limit": -1,
    "run_memory_limit": -1
  }
  try {
    const response = await(axios.post("https://emkc.org/api/v2/piston/execute", exec_req))
    console.log(response.data)
    res.send(response.data)
  } catch (err) {
    next(err)
  }
})

app.listen(PORT, () => {
  console.log('API server started, listening on ', PORT)
})