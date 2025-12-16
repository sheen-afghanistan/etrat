import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
    {
        donorName: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "AFN",
        },
        date: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        email: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
