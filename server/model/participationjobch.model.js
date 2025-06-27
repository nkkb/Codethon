import mongoose from "mongoose";

export const ParticipationjobchSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'Users',
        required: true
      },
      jobchallenge: {
        type: String,
        ref: 'jobchallenges',
        required: true
      },
      Date: {
        type: Date,
        default: Date.now
      },
      NbrCAnswer: {
        type: Number,
        required: true
      },
      NbrQ: {
        type: Number,
        required: true
      }
      
});

export default mongoose.model.participationjobch || mongoose.model('participationjobch', ParticipationjobchSchema);