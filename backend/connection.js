import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();


const connect=async()=>{
    try{
        const connection=await mongoose.connect(`${process.env.url}/reviews`)
            console.log(`connected to mongodb`)
        }
        catch(error){
            console.log(process.exit(1));
        }
}


export default connect;