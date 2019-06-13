const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { mongoURI, port } = require('./config')

const start = async () => {
  try {
    const uri = mongoURI
    // Use await here
    mongoose.connect(
      uri,
      { useNewUrlParser: true }
    )

    await mongoose.connection.once("open", () => {
      console.log("Conected to database");
    })

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.get('/', (req, res) => {
      res.send("<h1>API Reservation<h1>")
    })

    app.use(router)

    app.listen(port);
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

  console.log("Server running");
}

start()
