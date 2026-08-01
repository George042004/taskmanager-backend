const mongoose = require('mongoose')


const dbs = ()=>{
    mongoose.connect('mongodb://localhost:27017/dbs')
    .then(()=>{
        console.log("db connceted");
    })
    .catch(()=>{
        console.log("failed to conncet");

    })
}

module.exports = dbs