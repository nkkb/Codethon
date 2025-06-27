import mongoose from "mongoose";

const ParticipationcourseSchema = new mongoose.Schema({
 
  Points: {
    type: Number,
    required: [true, "Please provide a Points"],
  },
  Date: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    ref: "users"
  },

  Name: {
    type: String,
    ref: "gamifiedcourses"
  }
  , LearningpathName: {
    type: String,
    ref: "learningpaths"
  }
});

export default mongoose.model("participationcourse", ParticipationcourseSchema);
