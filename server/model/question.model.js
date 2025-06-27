import mongoose from "mongoose";

export const QuestionSchema = new mongoose.Schema({
    Language : {

        type: String,
        required: [true, "Please provide a language"],
    },
    Question: {
        type: String,
        required: [true, "Please provide a quetion"]
    }
    
    
});

export default mongoose.model.question || mongoose.model('question', QuestionSchema);