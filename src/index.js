// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import conectDB from "./db/index.js";
import express from "express"
import { app } from "./app.js";

dotenv.config({
    path:'./env '
})

conectDB().then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(` server is running on port ${process.env.PORT} `)
    })
}).catch(
    (err)=>console.log("mongo db connection error",err)
)

// const app=express()


// ;(async()=>{
//    try{
//       await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on("error",()=>{
//         console.log("Error",error)
//         throw error
//       })

//       app.listen(process.env.PORT, ()=>{
//         console.log(`app is listening on ${PORT}`)
//        })
//    }
  
//    catch (error){
//        console.log("ERROR :",error)
//        throw error 
//    }

// })()