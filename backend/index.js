const express= require("express");
let app = express();
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose')
 
app.use(cors())
app.use(express.json());
let dbFun = require("./database/dbFun");
mongoose.connect("mongodb://0.0.0.0:27017/todo").then(successful=>{
    console.log("connected to db")
}).catch(err=>
    console.log("failed connection",err)
)
app.post('/register',async(req,res)=>{
    try {
        console.log(req.body)
        let response = await dbFun.registerUser(req.body);
        console.log(response)
        if (response.status=='failed') {
           return res.status(404).json(response);   
        }
       
            res.status(200).json(response);         
    } catch (error) {
        res.status(500).json({status:"failed",message:"Internal error",error:error})
    }
});

app.post('/login',async(req,res)=>{
    try {
        let response = await dbFun.loginUser(req.body);
        
        if (response.status=='failed') {
           return res.status(404).json(response);   
        }
            res.status(200).json(response);         
    } catch (error) {
        res.status(500).json({status:"failed",message:"Internal error",error:error})
    }
});
app.post('/taskadd',async(req,res)=>{
    try {
        let response = await dbFun.addTask(req.body);
        
        if (response.status=='failed') {
           return res.status(404).json(response);   
        }
            res.status(200).json(response);         
    } catch (error) {
        res.status(500).json({status:"failed",message:"Internal error",error:error})
    }
});

app.get('/test',dbFun.authUser,async(req,res)=>{
    return res.status(200).json({
        status:"Authorized",
        email:req.user.email,
        username:req.user.username,
        userID:req.user.userID

    }); 
});
app.get('/task',async(req,res)=>{
    try {
        let response = await dbFun.getTask();
        console.log(response)
        
        if (response.status=='failed') {
           return res.status(404).json(response);   
        }
            res.status(200).json(response);         
    } catch (error) {
        res.status(500).json({status:"failed",message:"Internal error",error:error})
    }
});


app.get("/" ,(req, res)=>{
    res.end("ok");
})
app.listen(3001,console.log("server is up on 3001"))