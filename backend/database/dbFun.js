const usermodel=require("./models/user");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const todo = require("./models/todo")
let secretKey="kkfkkdrkfkrlmfkemfkmekfmemdfowekd"
require('dotenv').config();

let tokenUser = (user) => {  
    let userEmail = user.email
    let token=jwt.sign(userEmail,secretKey);   
    return token;
}
let authUser=async(req,res,next)=>{ 
    try {
        let authHeader = req.headers.authorization; 

        let token = authHeader && authHeader.split(' ')[1]
        if (!token) {
            
            return res.status(401).json({ status: "failed", message: "Token not provided" });
        }
        
        const data = jwt.verify(token, secretKey);
        

    let user =await usermodel.findOne({email: data });
    if (!user) {
        return res.status(404).json({ status: "failed", message: "User not found" });            
    } 
    req.user = user; 
    
    next() 
    } 
    catch (error) {
        return res.status(401).json({ status: "failed", message: error.message }) 
    }
}
let getTask=async()=>{
    try {
    let todos=await todo.find();        
    if (!todos) {
        return {status:"failed",message:"Task not found"}            
    }
    

    

    return {status:"success",task:todos}}   
 catch (error) {
    console.log(error)
    return {status:"failed",message:"Internal error",error:error}
} 

}

let loginUser=async(data)=>{


   
    try {

        let user=await usermodel.findOne(data);        
        if (!user) {
            return {status:"failed",message:"User not found"}            
        }
        

        

        let auth=tokenUser({email:user.email});
        return {status:"success",token:auth}   
            
    } catch (error) {
        console.log(error)
        return {status:"failed",message:"Internal error",error:error}
    }    
}
let registerUser=async(data)=>{
    try {
        let userEmail=data.email
        console.log(data,"fkf")
        
        if( await userExists(userEmail)){
            return {status:"failed",message:"User already exists, please sign in."}
        }


        let user=await usermodel.create(data);
      
        
        
        return {status:"success",data:user}
    } catch (error) {
        return {status:"failed",message:error.message}
    }
}
let addTask=async(data)=>{
    try {
        
       


        let saved=await todo.create(data);
      
        
        
        return {status:"success",data:saved}
    } catch (error) {
        return {status:"failed",message:error.message}
    }
}
let userExists = async(userEmail)=>{
    try{
        let user = await usermodel.findOne({email:userEmail})

        if(!user){
            return false
        }

        return true 
    }

    catch(error){
        return false
    }
}
module.exports={registerUser,loginUser,authUser,addTask,getTask}