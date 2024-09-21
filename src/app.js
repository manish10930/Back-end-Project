import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser  from "body-parser"


const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
 
app.use(express.json({limit:"16kb"}))  // to limit the request data

app.use(bodyParser.urlencoded({   // to fix data comming from serach params
    extended:true,
    limit:"16kb"
}))
app.get("/test",(req,res)=>{
    
    res.send("hiii manish this side")
})


app.use(express.static("public")) // to store img, pdf for public accesss

app.use(cookieParser()) // to access data by server from cookie
app.use(cors()); // Enable CORS if accessing from different domain
app.use(express.json());
// routers import 

import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users",userRouter)

export {app}