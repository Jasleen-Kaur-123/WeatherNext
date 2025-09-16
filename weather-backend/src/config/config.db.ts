import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI as string,{
            dbName: "weatherApp",
        });
        console.log("Mongo DB is connected.",conn)
    }catch(error){
        console.log("MongoDB is not connected",error);
        process.exit(1);
    }
};

export default connectDB;