"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Calendar, ArrowUpLeft, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("/api/posts");
                const data = await res.json();
                if (data.success) {
                    setPosts(data.data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex flex-col gap-0 pb-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background px-6 py-24 sm:py-32 lg:px-8">
                {/* Background Elements matching Home */}
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center relative z-10"
                >
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">
                        وبلاگ و <span className="text-primary">اخبار</span>
                    </h1>
                    <p className="text-lg leading-8 text-muted-foreground mb-8">
                        تازه‌ترین اخبار، مقالات آموزشی و رویدادهای مرکز را اینجا دنبال کنید
                    </p>
                    {/* Optional Search Bar Placeholder */}
                    <div className="relative max-w-md mx-auto">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                            <Search className="h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            className="block w-full p-4 pr-10 text-sm border rounded-full bg-background shadow-sm focus:ring-primary focus:border-primary transition-all hover:shadow-md"
                            placeholder="جستجو در مقالات..."
                        />
                    </div>
                </motion.div>
            </section>

            <section className="mx-auto max-w-7xl px-6 lg:px-8 -mt-10 relative z-10 block">
                {loading ? (
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <div className="animate-pulse flex flex-col items-center gap-4">
                            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                            <span className="text-muted-foreground">در حال بارگذاری اخبار...</span>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                    >
                        {posts.map((post) => (
                            <motion.article
                                key={post._id}
                                variants={item}
                                className="flex flex-col items-start justify-between bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative w-full aspect-video bg-zinc-200 overflow-hidden">
                                    {/* Placeholder or actual image */}
                                    {post.imageUrl ? (
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-zinc-100 group-hover:scale-110 transition-transform duration-700">
                                            <span className="text-sm font-medium">تصویر مقاله</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-foreground shadow-sm">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 p-6 w-full">
                                    <div className="flex items-center gap-x-4 text-xs text-muted-foreground mb-4">
                                        <time dateTime={post.createdAt} className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(post.createdAt).toLocaleDateString("fa-AF")}
                                        </time>
                                    </div>
                                    <h3 className="text-xl font-bold leading-6 text-foreground group-hover:text-primary transition-colors mb-4 line-clamp-2">
                                        <Link href={`/blog/${post._id}`}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground mb-6 flex-1">
                                        {post.excerpt}
                                    </p>

                                    <div className="relative mt-auto flex items-center gap-x-4 border-t w-full pt-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <p className="font-semibold text-foreground">
                                                {post.author}
                                            </p>
                                            <p className="text-muted-foreground text-xs">نویسنده</p>
                                        </div>
                                        <div className="mr-auto">
                                            <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                                <ArrowUpLeft className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}

                {!loading && posts.length === 0 && (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed flex flex-col items-center">
                        <div className="bg-muted p-6 rounded-full mb-4">
                            <Search className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-xl font-bold">هیچ مقاله‌ای یافت نشد</h3>
                        <p className="text-muted-foreground mt-2">به زودی مقالات جدید منتشر خواهد شد.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
