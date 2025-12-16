import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "لطفا عنوان مقاله را وارد کنید"],
        maxlength: [100, "عنوان مقاله نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
    },
    content: {
        type: String,
        required: [true, "لطفا محتوای مقاله را وارد کنید"],
    },
    excerpt: {
        type: String,
        required: [true, "لطفا خلاصه مقاله را وارد کنید"],
        maxlength: [200, "خلاصه مقاله نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"],
    },
    author: {
        type: String,
        default: "روابط عمومی",
    },
    category: {
        type: String,
        required: [true, "لطفا دسته‌بندی را مشخص کنید"],
    },
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
