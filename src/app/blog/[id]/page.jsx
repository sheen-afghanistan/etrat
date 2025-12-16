"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

export default function BlogPostPage() {
    const { id } = useParams();
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function fetchPost() {
            try {
                const res = await fetch(`/api/posts/${id}`);
                const data = await res.json();
                if (data.success) {
                    setPost(data.data);
                } else {
                    // Handle 404
                    router.push("/blog");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!post) return null;

    return (
        <article className="min-h-screen pb-16">
            {/* Header / Hero */}
            <div className="relative w-full h-[50vh] bg-zinc-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute inset-0 z-0">
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute bottom-0 right-0 p-6 md:p-12 z-20 max-w-4xl"
                >
                    <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
                        <span className="bg-primary px-3 py-1 rounded-full text-white text-xs font-bold shadow-md">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-1 backdrop-blur-md bg-white/10 px-2 py-0.5 rounded-full">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.createdAt).toLocaleDateString("fa-AF", { dateStyle: 'long' })}
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                        {post.title}
                    </h1>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-4xl mx-auto px-6 -mt-20 relative z-30"
            >
                <div className="bg-background rounded-3xl shadow-2xl p-8 md:p-12 border border-border/50 backdrop-blur-sm">
                    {/* Author Info */}
                    <div className="flex items-center justify-between border-b border-border pb-8 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground text-lg">{post.author}</p>
                                <p className="text-sm text-muted-foreground">نویسنده</p>
                            </div>
                        </div>
                        <Link href="/blog" className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors font-medium">
                            <ArrowRight className="h-4 w-4" />
                            بازگشت به وبلاگ
                        </Link>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl leading-relaxed text-foreground/90">
                        <ReactMarkdown
                            components={{
                                img: ({ node, ...props }) => (
                                    <img
                                        {...props}
                                        className="rounded-xl shadow-lg w-full object-cover my-6"
                                        alt={props.alt || "Blog image"}
                                    />
                                )
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </motion.div>
        </article>
    );
}
