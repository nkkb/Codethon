import mongoose from "mongoose";

export const JobchallengeSchema = new mongoose.Schema({
    Joboffername : {
        type: String,
        required : [true, "Please provide unique challenge name"],
        unique: [true, "challenge Exist"]
    }
   
    ,  Description: {
        type: String,
    }
   
    , Date: {
        type: Date,
    }
    , state: {
        type: String,
       
    },
    QCM: [{
        question: {
          type: String,
        },
        A: {
          type: String,
        },
        B: {
          type: String,
        },
        C: {
          type: String,
        },
        D: {
          type: String,
        },
        S: {
          type: String,
        },
      }]
    
});

export default mongoose.model.Jobchallenge || mongoose.model('jobchallenge', JobchallengeSchema);