const express=require("express");
const app=express();
require('dotenv').config({path: "./config/.env"});
const connectDb=require("./config/connectDb");
connectDb();
const User=require("./models/user")
app.use(express.json())
const PORT=process.env.PORT||4000;
app.post("/post",async(req,res)=>{
const {fullName,email,phone}=req.body
    try {
    const newUser=new User({
        fullName,email,phone
    })
    await newUser.save()
    res.send(newUser)
} catch (error) {
    res.send(error.message)
}
})
app.get("/get",async(req,res)=>{
    try {
        const users=await User.find()
        res.send(users)
    } catch (error) {
        res.send(error.message)
    }
})
app.get("/get/:id",async(req,res)=>{
    try {
        const theUser=await User.findById(req.params.id)
        res.send(theUser)
    } catch (error) {
        res.send(error.message)
    }
})
app.delete("/delete/:id",async(req,res)=>{
    try {
        const deletedUser=await User.findByIdAndDelete(req.params.id)
        res.send("user has been deleted")
    } catch (error) {
        res.send(error.message)
    }
})
app.put("/put/:id",async(req,res)=>{
    try {
        const editedUser=await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.send(editedUser)
    } catch (error) {
        res.send(error.message)
    }
})
app.listen(PORT,err=>
    err?console.log(err)
    :console.log(`server is successfuly running on PORT ${PORT}`)
    );