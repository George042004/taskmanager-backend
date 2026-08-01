const mongoose = require('mongoose')


const dbs = ()=>{
    mongoose.connect('mongodb+srv://georgemullarm045_db_user:MongoGeorge__90_.@cluster0.5vy1j2m.mongodb.net/?appName=Cluster0')
    .then(()=>{
        console.log("db connceted");
    })
    .catch(()=>{
        console.log("failed to conncet");

    })
}

module.exports = dbs