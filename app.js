const express = require('express');
const  connect  = require('./DB/connenction');
const { userRoute, messageRoute, authRoute } = require('./modules/allRoutes.routes');
const app = express()
const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

app.use(express.json())
require("dotenv").config();

const port = process.env.PORT
connect()

app.use(userRoute, messageRoute, authRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))