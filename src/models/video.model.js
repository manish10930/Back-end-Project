import mongoose from "mongoose";
import Mongoose,{Schema}  from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // used for advance mongdb query

// bcrypt used to hash your passWord
const videoSchema=new Schema({
    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        require:true,

    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true

    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true


    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)


export const Video=mongoose.model("Video",videoSchema)
