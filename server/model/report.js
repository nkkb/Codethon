import mongoose from "mongoose";

export const ReportSchema = new mongoose.Schema({
    analyst: {
        type: String,
        required : [true, "Please provide  Analyst name"],

    }
    ,  title: {
        type: String,
        required : [true, "Please provide unique Learning path description"],
        unique: [true, "report Exist"],
    }
    ,  report: {
        type: String,
        required : [true, "Please provide unique Learning path description"],
    }
    ,  statistic: {
        type: String,
        required : [true, "Please provide unique Learning path description"],
    }
    
});

export default mongoose.model.Report || mongoose.model('report', ReportSchema);