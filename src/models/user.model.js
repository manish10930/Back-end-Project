import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
  
  },
  fullname:{
    type:true,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
  
  },
  avatar:{
    type:String,
    required:true
  },
  cover:{
    type:String
  }
  ,
  watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
  ],
  password:{
    type:String,
    required:[true,"password is required"]
  },
  refreshToken:{
    type:String
  }
},
{
    timestamps:true
}
)
userSchema.pre("save",async function(next){
  if(!this.isModified) return next()
     this.password=bcrypt.hash(this.password,10)
  next()
})

userSchema.methods.isPasswordCorrect=async function(password)
{
  await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken= function (){
  return jwt.sign({
    _id:this._id,
    email:this.email,
    usename:this.usename,
    fullname:this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET,
  { 
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  }
)
}
userSchema.methods.generateRefreshToken= function (){
  return jwt.sign({
    _id:this._id,

  },
  process.env.REFRESH_TOKEN_EXPIRY,
  { 
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  }
)
}

export const User=mongoose.model("User",userSchema)


