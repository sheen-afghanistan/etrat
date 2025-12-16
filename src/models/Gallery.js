import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "لطفا عنوان تصویر را وارد کنید"],
    },
    imageUrl: {
        type: String,
        required: [true, "لطفا تصویر را آپلود کنید"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
