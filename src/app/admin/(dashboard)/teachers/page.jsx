"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, UserPlus } from "lucide-react";

export default function TeachersAdminPage() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        bio: "",
        imageUrl: "",
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const res = await fetch("/api/teachers");
            const data = await res.json();
            if (data.success) setTeachers(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        let imageUrl = formData.imageUrl;

        try {
            // 1. Upload Image content if selected
            if (file) {
                const uploadData = new FormData();
                uploadData.append("file", file);
                const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
                const uploadResult = await uploadRes.json();
                if (uploadResult.success) {
                    imageUrl = uploadResult.url;
                } else {
                    throw new Error("آپلود تصویر انجام نشد");
                }
            }

            // 2. Save Teacher
            const res = await fetch("/api/teachers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, imageUrl }),
            });

            if (res.ok) {
                setFormData({ name: "", role: "", bio: "", imageUrl: "" });
                setFile(null);
                // Reset file input
                document.getElementById("t-image").value = "";
                fetchTeachers();
            } else {
                alert("خطا در ثبت استاد");
            }

        } catch (error) {
            console.error(error);
            alert("خطای عملیات");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("آیا مطمئن هستید؟")) return;
        try {
            await fetch(`/api/teachers/${id}`, { method: "DELETE" });
            setTeachers(teachers.filter((t) => t._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">مدیریت اساتید</h1>
                <p className="text-muted-foreground mt-2">
                    افزودن و حذف اساتید از لیست وب‌سایت.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Form */}
                <div className="md:col-span-1">
                    <div className="rounded-xl border bg-card p-6 shadow-sm sticky top-8">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <UserPlus className="h-5 w-5" />
                            استاد جدید
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">نام و نام خانوادگی</label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">سمت / تخصص</label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    required
                                    placeholder="مثلاً: مدرس ریاضی"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">بیوگرافی کوتاه</label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">تصویر پرسنلی</label>
                                <input
                                    id="t-image"
                                    type="file"
                                    accept="image/*"
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={submitting}>
                                {submitting ? "در حال ثبت..." : "افزودن استاد"}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="md:col-span-2 space-y-4">
                    {loading ? <div>در حال بارگذاری لیست...</div> : (
                        teachers.map((t) => (
                            <div key={t._id} className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
                                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-muted">
                                    {t.imageUrl ? (
                                        <img src={t.imageUrl} alt={t.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full bg-zinc-200" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold truncate">{t.name}</h3>
                                    <p className="text-sm text-muted-foreground truncate">{t.role}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{t.bio}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(t._id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                    {!loading && teachers.length === 0 && (
                        <div className="text-center p-8 border rounded-lg border-dashed">
                            هنوز استادی ثبت نشده است.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
