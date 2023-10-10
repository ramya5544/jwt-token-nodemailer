import User from "../Models/user.schema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' 
import dotenv from 'dotenv'
import mail from "../Services/nodemail.js";
dotenv.config()

export const registerUser=async(req,res)=>{
    try{
      const {username,password,email}=req.body
      const hashPassword=await bcrypt.hash(password,10)
      console.log("hashPassword",hashPassword);
      const newUser=new User({username,email,password:hashPassword})
      await newUser.save()
      res.status(200).json({message:"user registred successfully",data:newUser})
    }catch{
        console.log(error);
        res.status(500).json({error:"register failed,,internal error"}) 
    }
}

export const loginUser=async(req,res)=>{
    try{
const {email,password}=req.body
const user=await User.findOne({email})
  if(!user){
    return res.status(401).json({message:"user not found"})
  }
  const passwordMatch=await bcrypt.compare(password,user.password)
  if(!passwordMatch){
    return res.status(401).json({message:"invalid user password"})
  }
  const token=jwt.sign({_id:user._id},process.env.JWT_SECERT)
  mail();
  res.status(200).json({message:"login successfully",token:token})
    }catch(error){
        console.log(error);
        res.status(500).json({error:"login failed,,internal error"}) 
    }
}

// export const updateUser=async (req,res)=>{
//   try{
//     const {id}=req.params
//     const {username,email,password}=req.body
//     const user=await User.findOne({_id:id})
//     if(!user){
//       return res.status(401).json({message:"user not found"})
//     }
//     const hashPassword=await bcrypt.hash(password,10)
//     const result=await User.updateOne({_id:id},{username,email,password:hashPassword})
//     if(result.matchedCount===0){
//       return res.status(401).json({message:"user not matched"})
//     }
//     const updatedUser=await User.findById(id)
//     res.status(200).json({message:"updated successfully",data:updatedUser})

//   }catch(error){
//         console.log(error);
//         res.status(500).json({error:"login failed,internal error"}) 
//     }
// }

// export const deleteUser=async(req,res)=>{
//   try{
// const userId=req.params.id
// const deletedUser=await User.deleteOne({_id:userId})
// if(deletedUser.deletedCount===0){
//   return res.status(404).json({message:"user not found"})
// } 
// res.status(200).json({message:"deleted successfully"})
//   }catch(error){
//         console.log(error);
//         res.status(500).json({error:"login failed,internal error"}) 
//     }
// }

export const getUserById=async(req,res)=>{
    try{
const userId=req.user._id
const user=await User.findById(userId)
res.status(200).json(user)

    }catch(error){
        console.log(err)
        res.status(500).json({err:"error in get user by id"})
    }
}