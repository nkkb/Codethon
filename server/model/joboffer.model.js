import mongoose from "mongoose";

export const JobofferSchema = new mongoose.Schema({
    Joboffername : {
        type: String,
        required : [true, "Please provide unique Learning path name"],
    },
    Experience: {
        type: String,
    } , Salary: {
        type: Number,
    }
    , Date: {
        type: Date,
        default: Date.now
      }
    ,   state: {
        type: String,
        default: 'unfinished',
    }
    , companyname : {
        type: String,
        
    }
    , Recruiter : {
        type: String,
        required : [true, "Please provide unique Learning path name"],
    }
    
});

export const Joboffer = mongoose.model('joboffer', JobofferSchema);