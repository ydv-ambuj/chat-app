import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Signup new user
export const signup=async(req,res)=>{
    const{fullName,email,passward,bio}=req.body;
    try{
        if(!fullName|| !email|| !passward|| !bio){
            return res.json({success:false,message:"Missing Details"})
        }
        const user=await User.findOne({email});
        if(user){
           return res.json({success:false,message:"Account already exist"}) 
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassward =await bcrypt.hash(passward,salt);

        const newUser =await User.create({
          fullName,email,passward:hashedPassward,bio  
        });

        const token= generateToken(newUser._id)
        res.json({success:true,userData:newUser,token,
            message:"Account created  succesfully"
        })


    }catch(error){
        console.log(error.message);
         res.json({success:false,message:error.message})

    }
}

//controller to login a user
export const login = async (req,res)=>{
    try{
         const{email,passward}=req.body;
       const userData = await User.findOne({ email });

       if (!userData) {
    return res.json({
        success: false,
        message: "User not found"
    });
   }

      const isPasswardCorrect = await bcrypt.compare(
    passward,
    userData.passward
    );

     if (!isPasswardCorrect) {
    return res.json({
        success: false,
        message: "Invalid credentials"
    });
    }
       if(!isPasswardCorrect){
         res.json({success:false,message:"Invalid credentials"});

       } 
       const token= generateToken(userData._id)
        res.json({success:true,userData,token,
            message:"Logging succesfull"
        })

    }catch(error){
         console.log(error.message);
         res.json({success:false,message:error.message})

    }

}
//controller to check if user is authenicated 
export const chechAuth =(req,res)=>{
    res.json({success:true,user:req.user});
}

//Controller to update userr profile details
export const updateProfile = async(req,res)=>{
    try{
        const { profilePic,bio,fullName }=req.body;
        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
           updatedUser= await User.findByIdAndUpdate(userId,{bio,fullName},
            {new:true});
        }
        else{
            const upload=await cloudinary.uploader.upload(profilePic);

            updatedUser=await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName},
                {new:true});
        }
        res.json({success:true,user:updatedUser})
    } catch(error){
        console.log(error.message);
         res.json({success:false,message:error.message})
    }

}

