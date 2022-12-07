const express = require ('express')
const app = express()
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const {readdirSync} = require('fs')
require ('dotenv').config()


//middleware

app.use(helmet())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))
app.use(cors())

// DB connect

mongoose
    .connect(process.env.database)
    .then (() => console.log ('DB connected'))
    .catch((err) => console.log ("DB Error => ", err))

    //routes middleware

    readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))

    //server
    const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log(`app is running on port ${port}`)
    })  