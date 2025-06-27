import mongoose from "mongoose";

export const gamifiedcourseSchema = new mongoose.Schema({
    Name : {
        type: String,
        required : [true, "Please provide unique Name"],
        unique: [true, "Name Exist"]
    },
     Course: {
         type: String,
         required : [true, "Please provide unique Name"],
     },
     CourseP: {
         type: Number
     }
     ,  InteractiveP: {
         type: Number,
     }
     ,  QuizP: {
         type: Number,
     }
    ,  Description: {
        type: String,
    }
    ,  PDescription: {
      type: String,
  }
    ,  Hint: {
        type: String,
    }
    ,  Test: {
        type: String,
    }
    ,  Solution: {
        type: String,
    }
    ,  code: {
      type: String,
  }

 ,  question: {
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

export default mongoose.model.gamifiedcourse || mongoose.model('gamifiedcourse', gamifiedcourseSchema);