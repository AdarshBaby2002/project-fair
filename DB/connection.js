const mongoose = require('mongoose')
const connectionString=process.env.connectionString
mongoose.connect(connectionString).then(res=>{
    console.log("pf server is connected to database")
})
.catch(err=>{
    console.log(err)
})