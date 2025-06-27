import mongoose from "mongoose";

export const ContactSchema = new mongoose.Schema({
    FULLNAME : {
        type: String,
       
     
    }
    , EMAIL: {
        type: String,
     
    }
    , MESSAGE: {
        type: String,
       
    }
    
});

export default mongoose.model.Contact || mongoose.model('contact', ContactSchema);