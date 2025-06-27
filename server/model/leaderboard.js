import mongoose from "mongoose";

export const LeaderboardSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  leaderboard: [
    {
      rank: {
        type: Number,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      profilePicture: {
        type: String,
      },
      points: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Leaderboard", LeaderboardSchema);
