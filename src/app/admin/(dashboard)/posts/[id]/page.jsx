"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Save } from "lucide-react";
import Link from "next/link";

export default function EditPostPage({ params }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        excerpt: "",
        content: "",
    });

    useEffect(() => {
        fetchPost();
    }, [resolvedParams.id]);

    const fetchPost = async () => {
        try {
            const res = await fetch(`/api/posts/${resolvedParams.id}`);
            const data = await res.json();
            if (data.success) {
                setFormData(data.data);
            } else {
                alert("مقاله پیدا نشد");
                router.push("/admin/posts");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/posts/${resolvedParams.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/posts");
                router.refresh();
            } else {
                alert("خطا در ویرایش مقاله");
            }
        } catch (error) {
            console.error(error);
            alert("خطای سرور");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>در حال بارگذاری...</div>;

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/posts">
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">ویرایش مقاله</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">عنوان</label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">دسته‌بندی</label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">انتخاب کنید...</option>
                        <option value="آموزشی">آموزشی</option>
                        <option value="اخبار">اخبار</option>
                        <option value="مشاوره">مشاوره</option>
                        <option value="رویداد">رویداد</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">خلاصه</label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">محتوا</label>
                    <textarea
                        className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? "در حال ذخیره..." : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            بروزرسانی مقاله
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
