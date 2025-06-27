import mongoose from "mongoose";

export const PlanificationsystemeSchema = new mongoose.Schema({
    ChallengeName: {
        type: String,
        required: [true, "Please provide a ChallengeName"],
       
    }
    ,
    selectedStartDate: {
        type: Date,
        required: [true, "Please provide a StartDate for this challenge"],
    },
    selectedEndDate: {
        type: Date,
        required: [true, "Please provide a EndDate for this challenge"]
       
    }  
  
    
});

export default mongoose.model.planificationsysteme || mongoose.model('planificationsysteme', PlanificationsystemeSchema);