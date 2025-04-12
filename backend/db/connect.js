import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const connect = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.url}/testandtry`);
        console.log(`Connected to MongoDB || DB host: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error", error);
        console.log(process.exit(1));
    }
};

export default connect;
