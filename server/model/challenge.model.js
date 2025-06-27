import mongoose from "mongoose";

export const ChallengeSchema = new mongoose.Schema({
    ChallengeName : {
        type: String,
        required : [true, "Please provide unique challange"],
        unique: [true, "challange Exist"]
    },
    Points: {
        type: Number ,
    }

   , Language: {
        type: String,
        required : [true, "add Language"]
    }
    ,  TypeofParticipation: {
        type: String,
    }
    ,  Difficulty: {
        type: String,
    }
    ,  Question: {
        type: String,
    }
    ,  Description: {
        type: String,
    }
    ,  Examples: {
        type: String,
    }
    ,  Test: {
        type: String,
    }
    ,  code: {
        type: String,
    }
    ,  Solution: {
        type: String,
    }
    , Date: {
        type: Date,
        default: Date.now
    }
    , state: {
        type: String,
        required : [true, "Please provide state challange"]
    }
    , Instructor : {
        type: String,
        required : [true, "Please provide Instructor that created the challange"]
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

export default mongoose.model.challenges || mongoose.model('challenge', ChallengeSchema);