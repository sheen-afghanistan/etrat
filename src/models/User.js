import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "لطفا نام کاربری را وارد کنید"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "لطفا رمز عبور را وارد کنید"],
    },
    role: {
        type: String,
        default: "admin", // Since functionality is only for admin
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
