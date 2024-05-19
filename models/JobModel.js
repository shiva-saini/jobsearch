import { Timestamp } from "mongodb"
import mongoose from "mongoose"
const JobSchema = new mongoose.Schema({
    company:String,
    position:String,
    jobStatus:{
        type:String,
        enum:['interview',"pending","declined"],
        default:'pending'
    },
    jobType:{
        type:String,
        enum:['full-time',"part-time","internship"],
        default:'full-time'
    },
    jobLocation:{
        type:String,
        default:'my-city'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
    
},
{timestamps:true}

)

export default mongoose.model('Job',JobSchema);