import mongoose from "mongoose";

const ParticipationchallengeSchema = new mongoose.Schema({
  ChallengeName: {
    type: String,
    ref: "challenges"
  },
  Answer: {
    type: String,
    required: [true, "Please provide an Answer"],
  },
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
});

export default mongoose.model("participationchallenge", ParticipationchallengeSchema);
