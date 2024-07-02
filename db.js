const mongoose = require ('mongoose')
const mongoURI= 'mongodb://localhost:27017/multerFileUpload';


mongoose.connect(mongoURI)


const db = mongoose.connection ;

db.once ('open',()=>{
    console.log("connected to mongo");

});



module.exports= db;