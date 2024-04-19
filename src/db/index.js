import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import expreess from "express"

const app=expreess()
const conectDB=async ()=>{
    try{
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(` \n MongoDB connected !! ${connectionInstance}`)
        app.on( "error",()=>{
            console.log("ERROR :",error)
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on ${PORT}`)
        })

    }
    catch (err){
      console.log("MongonDB connection error : ",err)
      process.exit(1)
     
    }
}

export default conectDB