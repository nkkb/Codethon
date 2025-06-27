import mongoose from "mongoose";

export const CertificatSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Please provide a certificate name"],

    },
    LearningpathName: {
        type: String,
        required: [true, "LearningpathName"],
       
    },
    Date: {
        type: Date,
        default: Date.now
      }
});

export default mongoose.model.certificate || mongoose.model('certificate', CertificatSchema);