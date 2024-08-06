import mongoose from "mongoose";
const dataModel= new mongoose.Schema ({
    fname:String,
    lname:String,
    company:String,
    position:String,
    year:String,
    postalcode:String,
    email:String
});

export const leadData = mongoose.models.sujaforms || mongoose.model("sujaforms", dataModel);
