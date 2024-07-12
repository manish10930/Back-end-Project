import {v2 as cloudinary} from "cloudinary"
import fs from "fs"



    // Configuration
 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_CLOUD_SECRET // Click 'View Credentials' below to copy your API secret
    });

    const UploadOnCloudinary= async (LocalFilePath)=>{ 

        try{
           if(!LocalFilePath) return null;
          const response = await cloudinary.uploader.upload(LocalFilePath,{
            resource_type:"auto"
           })
           console.log("File is uploaded on Cloudinary !",response.url)
           return response
           
        }
        catch(err){
           fs.unlinkSync(LocalFilePath) // will remove the locally uploaded file
        }
        return null; 
    }

    export {UploadOnCloudinary}