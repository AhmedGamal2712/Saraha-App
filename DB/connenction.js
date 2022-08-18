
const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect(process.env.DB_CONNECTION).then(res => console.log("Db conected ..."))
    .catch(err => console.log("DB error", err))
}

module.exports = connect;