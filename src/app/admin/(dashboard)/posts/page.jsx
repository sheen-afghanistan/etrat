"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PostsAdminPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/posts");
            const data = await res.json();
            if (data.success) {
                setPosts(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("آیا از حذف این مقاله اطمینان دارید؟")) return;

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setPosts(posts.filter((post) => post._id !== id));
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    if (loading) return <div>در حال بارگذاری...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">مدیریت مقالات</h1>
                <Button asChild>
                    <Link href="/admin/posts/new">
                        <Plus className="mr-2 h-4 w-4" />
                        مطلب جدید
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <div className="w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-right">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">عنوان</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">دسته‌بندی</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">تاریخ انتشار</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">عملیات</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {posts.map((post) => (
                                <tr key={post._id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{post.title}</td>
                                    <td className="p-4 align-middle">{post.category}</td>
                                    <td className="p-4 align-middle">
                                        {new Date(post.createdAt).toLocaleDateString("fa-AF")}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/posts/${post._id}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600"
                                                onClick={() => handleDelete(post._id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                        هیچ مقاله‌ای یافت نشد.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
