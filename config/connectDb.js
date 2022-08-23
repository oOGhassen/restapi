const mongoose=require("mongoose");


module.exports=connectDb=async()=>{
    try {
        await mongoose.connect(process.env.db)
        console.log("database is successfully connected")
    } catch (error) {
        console.log(error.message)
    }
}