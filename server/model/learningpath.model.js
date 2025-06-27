import mongoose from "mongoose";

export const LearningpathSchema = new mongoose.Schema({
    LearningpathName : {
        type: String,
        required : [true, "Please provide unique Learning path name"],
        unique: [true, "Learning path Exist"]
    }
    , Language: {
        type: String,
        required : [true, "add Language"]
    }
    ,  Points: {
        type: Number,
        required : [true, "add Points"]
    }
    ,  Description: {
        type: String,
        required : [true, "add Description"]
    }
    ,  Participants: {
        type: Number,
    }
    , Date: {
        type: Date,
        default: Date.now
    }
    
    
});

export default mongoose.model.Learningpath || mongoose.model('Learningpath', LearningpathSchema);