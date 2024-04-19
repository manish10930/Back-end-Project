// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import conectDB from "./db/index.js";

dotenv.config({
    path:'./env '
})




conectDB()
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