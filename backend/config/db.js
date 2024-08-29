import mongoose from "mongoose";

export const connectDB = async () =>{

    await mongoose.connect('mongodb+srv://kushalgowda327:8123090954@cluster0.crsbs.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}