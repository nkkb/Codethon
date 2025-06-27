import mongoose from "mongoose";

export const InterviewSchema = new mongoose.Schema({
    Joboffername : {
        type: String,
        required : [true, "Please provide unique challenge name"],
        ref: "joboffers"
    }
    , link: {
        type: String,
        required : [true, "Please provide link"],
    }
    , Dinterview: {
        type: Date,
        required : [true, "Please provide unique date"],
    }
    , username: {
        type: String,
        required : [true, "Please provide user"],
        ref: "users"
    }
    , Rname: {
        type: String,
        required : [true, "Please provide user"],
        ref: "users"
    }
    
});

export default mongoose.model.Interview || mongoose.model('interview', InterviewSchema);