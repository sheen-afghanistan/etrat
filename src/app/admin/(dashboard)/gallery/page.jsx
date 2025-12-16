"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, Image as ImageIcon } from "lucide-react";

export default function GalleryAdminPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            if (data.success) {
                setImages(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch gallery:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !title) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            // 1. Upload File
            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const uploadData = await uploadRes.json();

            if (uploadData.success) {
                // 2. Save to DB
                const res = await fetch("/api/gallery", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title,
                        imageUrl: uploadData.url,
                    }),
                });

                if (res.ok) {
                    setTitle("");
                    setFile(null);
                    fetchImages();
                    // Reset file input manually
                    document.getElementById("file-upload").value = "";
                }
            } else {
                alert("خطا در آپلود فایل");
            }
        } catch (error) {
            console.error(error);
            alert("خطای سیستمی");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("آیا از حذف این تصویر اطمینان دارید؟")) return;

        try {
            const res = await fetch(`/api/gallery/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setImages(images.filter((img) => img._id !== id));
            }
        } catch (error) {
            console.error("Failed to delete image:", error);
        }
    };

    if (loading) return <div>در حال بارگذاری...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">مدیریت گالری تصاویر</h1>
                <p className="text-muted-foreground mt-2">
                    تصاویر جدید را آپلود کنید یا تصاویر موجود را مدیریت نمایید.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Upload Form */}
                <div className="md:col-span-1">
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            آپلود تصویر جدید
                        </h2>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">عنوان تصویر</label>
                                <input
                                    type="text"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder="مثلاً: جشن فارغ‌التحصیلی"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">فایل تصویر</label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={uploading}>
                                {uploading ? "در حال آپلود..." : "افزودن به گالری"}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Image List */}
                <div className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {images.map((img) => (
                            <div key={img._id} className="group relative aspect-square rounded-lg border bg-muted">
                                <img
                                    src={img.imageUrl}
                                    alt={img.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-between">
                                    <span className="text-xs truncate">{img.title}</span>
                                    <button
                                        onClick={() => handleDelete(img._id)}
                                        className="text-red-400 hover:text-red-300 transition-colors bg-white/10 p-1.5 rounded-full"
                                        title="حذف"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {images.length === 0 && (
                            <div className="col-span-full py-12 text-center text-muted-foreground flex flex-col items-center gap-2 border-2 border-dashed rounded-xl">
                                <ImageIcon className="h-10 w-10 opacity-50" />
                                <p>هنوز تصویری آپلود نشده است.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
