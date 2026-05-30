import mongoose from "mongoose"

//connected to mongodb with mongoose
const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("momgodb connected");
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;