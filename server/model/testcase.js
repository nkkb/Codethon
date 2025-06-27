import mongoose from "mongoose";

export const TestcaseSchema = new mongoose.Schema({
    testcase : {
        type: String,
    }
 
    
});

export default mongoose.model.Testcase || mongoose.model('testcase', TestcaseSchema);