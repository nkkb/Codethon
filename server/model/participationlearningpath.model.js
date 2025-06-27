import mongoose from "mongoose";

const ParticipationlearningpathSchema = new mongoose.Schema({
 
  LearningpathName: {
    type: String,
    ref: "learningpaths"
  },
  username: {
    type: String,
    required: [true, "Please provide an user name"],
    ref: "users"
  },
  Date: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("participationlearningpath", ParticipationlearningpathSchema);