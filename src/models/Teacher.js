import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "لطفا نام استاد را وارد کنید"],
    },
    role: {
        type: String,
        required: [true, "لطفا سمت/نقش استاد را وارد کنید"],
    },
    bio: {
        type: String,
        required: [true, "لطفا بیوگرافی کوتاه استاد را وارد کنید"],
    },
    imageUrl: {
        type: String,
        default: "/images/teacher-placeholder.jpg",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);
