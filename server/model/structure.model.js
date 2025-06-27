import mongoose from "mongoose";

export const StructureSchema = new mongoose.Schema({
    Coursename: {
        type: String,
        required : [true, "Please provide unique Course name"],
       
    }
    ,  Description: {
        type: String,
        required : [true, "Please provide unique Learning path description"],
    }
    ,  CourseP: {
        type: Number
    }
    ,  InteractiveP: {
        type: Number,
    }
    ,  QuizP: {
        type: Number,
    }

    , Date: {
        type: Date,
        default: Date.now
    },
    LearningpathName : {
        type: String,
        required : [true, "Please provide unique Learning path name"],
        ref: "Learningpath"
    }
    
});

export default mongoose.model.Structure || mongoose.model('Structure', StructureSchema);