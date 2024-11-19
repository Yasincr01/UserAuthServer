const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// register
exports.registerController = async(req,res)=>{
    console.log("Inside Register Controller");
    console.log(req.body);
    
    const {firstname,secondname,email,password,phno}=req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            return res.status(406).json("Already existing user... Please Login!!!")
        }else{
            const encrypted = await bcrypt.hash(password,10)

            const newUser = new users({
                firstname,secondname,email,password:encrypted,phno
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
        
    }
    
}

// login
exports.loginController = async (req,res) =>{
    console.log("Inside Login controller");
    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            bcrypt.compare(password,existingUser.password)
            // token generation
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user:existingUser,token})
        }else{
            res.status(401).json("Invalid Email or Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// // List All Users
exports.allUserViewController=async(req,res)=>{
    console.log("Inside allUserController");
    try
    {
        const allUser= await users.find()
        res.status(200).json(allUser.map(user=>({firstname: user.firstname,email:user.email})))
    }
    catch(err)
    {
        res.status(err)
    }  
}

// single user
exports.oneUserViewController=async(req,res)=>{
    console.log("Inside oneUserController");
    const email=req.body.email
    try
    {
        const userDetails= await users.find({email})
        if(userDetails)
        {
            res.status(200).json(userDetails.map( Detail=> ({firstname: Detail.firstname,secondname:Detail.secondname,email:Detail.email,phno:Detail.phno})))
        }
        else
        {
            res.status(404).json("User not Found")
        }
    }
    catch(err)
    {
        console.log(err);
        
    }

    
}