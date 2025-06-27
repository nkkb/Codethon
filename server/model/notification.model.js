import mongoose from "mongoose";

export const NotificationSchema = new mongoose.Schema({
    User: {
        type: String,
        required: [true, "Please provide a reclamation"],
    },
    title: {
        type: String,
        required: [true, "Please provide a reclamation"],
    },
    Content: {
        type: String,
        required: [true, "Please provide a reclamation"],
    }
    ,
    Date: {
        type: Date,
        default: Date.now
      },
    
});

export default mongoose.model.notification || mongoose.model('notification', NotificationSchema);