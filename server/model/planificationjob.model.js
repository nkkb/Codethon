import mongoose from "mongoose";

export const PlanificationjobchSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: [true, "Please provide a name"],
       
    }
    ,
    Date : {
        type: Date,
        required: [true, "Please provide a date for this challenge"],
        unique : true,
    },

 Dateofcreation: {
        type: Date
        
        
    }
    ,
    Points: {
        type: Number,
        required: [true, "Please provide points"]
       
    }
    ,
    Time: {
        type: Number,
        required: [true, "Please provide a time"]
       
    }  
  
    
});

export default mongoose.model.planificationjob || mongoose.model('planificationjob', PlanificationjobchSchema);