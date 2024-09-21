
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User  } from "../models/user.model.js";
import { UploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async (req,res)=>{
    //user details from front end
    // validation empty or not 
    // check if user already enrolled or not : email or username 
    // check for images or avatar
    //upload them to cloudnary
    // create user object 
    // remove password and refresh token from response
    // check for user creation
    // return response  
    const {email,username,avatar,password,fullname,coverImage}=req.body

    console.log("coverImage-->",coverImage)
    console.log("avatar-->",avatar)
    console.log("username-->",username)
  
    // return res.send({
    //     message:"ok"
    // })

    // if([email,password,fullname,username].some((field)=> 
    //  field.trim()==="")
    //    )
    // {
    //     throw new ApiError(400,"All fiels are required")
    // }
    if ([email, password, fullname, username].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    

    const existedUser= await User.findOne(
        {
            $or : [{email}, {username}]
        }
    )
    if(existedUser)
        
        {
            throw new  ApiError(409,"User already existed,Use other email ")
        }

    const avatarLocalPath=req.files?.avatar[0]?.path || null
    console.log("avatarLocalPath--->",avatarLocalPath )
    console.log("req-->",req.files)

    // const coverImageLocalPath=req.files?.coverImage[0]?.path
    let coverImageLocalPath;

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0 )
        {
            coverImageLocalPath=req.files.coverImage[0].path
        }

    // console.log("coverImageLocalPath--->",coverImageLocalPath )

 console.log("avatarLocalPath--->",avatarLocalPath)
    if(!avatarLocalPath)
        {
            throw new ApiError(400,"Avatar file is required")
        }
    const avatarImg= await UploadOnCloudinary(avatarLocalPath)

   

    const coverImg= await UploadOnCloudinary(coverImageLocalPath)
    console.log("coverImg--->",coverImg)

    console.log("avatarImg--->",avatarImg)

    if(!avatarImg)
        {
            throw new ApiError(400,"Avatar file is required")
 
        }
       const user= await User.create({
            fullname,
            avatar:avatarImg.url,
            coverImage:coverImg?.url  || " ",
            email,
            password,
            username:username.toLowerCase()
        })

        const createdUser= await User.findById(user._id).select(
            "-password  -refreshToken"
        )
        if(!createdUser){
            throw new ApiError(500,"somthing went wrong while creating the user !")
        }

        return res.status(201).json(
            new ApiResponse(200,createdUser,"User is registered successfully !")
        )
} )


const generateAccessAndRefreshTokens= async(userId)=>{
    try {

        const user=await User.findById(userId);
        const accessToken=user.generateAccessToken( )
        const refreshToken=user.generateRefreshToken()

        user.refreshToken=refreshToken

       await user.save({valiateBeforeSave:false})

       return {accessToken,refreshToken }
        
    } catch (error) {
        throw new ApiError(500,"Somthing Went Wrong")
    }
}
 
const loginUser=asyncHandler(async(req,res)=>{ 


    // user or email
    //find user
    //access and refresh tokens
    //send cookies 
     const {email,username,password}=req.body;
      
     if( !email || !username )
     {
        throw ApiError(400,"username or email is required !")
     }
     const user = await  User.findOne({
        $or :[{username}, {email}]
     })

     if(!user)
     {
        throw new ApiError(404, "User Does Not Exits !")
     }

     const isPassswordValid=await user.isPasswordCorrect(password)

     if(!isPassswordValid)
        {
           throw new ApiError(401, " Invalid Password !")
        }

    const {refreshToken,accessToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await  User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).
    json(
        new ApiResponse(200, {user:loggedInUser,accessToken,refreshToken},"User Logged in Successfully !")
    )

})

export {registerUser,
    loginUser
}