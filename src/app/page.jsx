"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookOpen, Users, Heart, Sparkles, Calendar, Mail, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [featuredTeachers, setFeaturedTeachers] = useState([]);

  useEffect(() => {
    fetch("/api/posts").then(res => res.json()).then(data => {
      if (data.success) setLatestPosts(data.data.slice(0, 3));
    });

    fetch("/api/teachers").then(res => res.json()).then(data => {
      if (data.success) setFeaturedTeachers(data.data.slice(0, 4));
    });
  }, []);

  return (
    <div className="flex flex-col gap-0 pb-16">
      {/* Modern Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Background Elements */}
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-blue-500/20 opacity-20 blur-[100px]"></div>

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 gap-1">
              <Sparkles className="w-3 h-3" />
              <span>توانمندسازی جامعه</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl text-foreground leading-normal py-2">
              روشن‌ساختن آینده — یک دختر، یک کودک، یک صنف در هر بار
            </h1>
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed leading-relaxed">
              مرکز آموزشی عترت علم (EEEC) با تمرکز بر آموزش دختران و کودکان کوه‌چهل‌دختران کابل را توانمند می‌سازد. هدف ما تا سال 2030 آموزش 20,000 کودک و 2,000 زن جوان است
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button asChild size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                <a href="mailto:etrat.elm@gmail.com">
                  حمایت / کمک مالی <ArrowLeft className="mr-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full hover:bg-muted/50 transition-colors">
                <Link href="/programs">آشنایی با برنامه‌ها</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Featured Teachers */}
      {featuredTeachers.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">اساتید برجسته</h2>
                <p className="text-muted-foreground mt-2">با برخی از بهترین مدرسین ما آشنا شوید</p>
              </div>
              <Button variant="ghost" asChild className="group">
                <Link href="/teachers">
                  مشاهده همه <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredTeachers.map((teacher, idx) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  key={teacher._id}
                  className="group relative overflow-hidden rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="aspect-square relative overflow-hidden bg-zinc-200">
                    <img
                      src={teacher.imageUrl || "/images/teacher-placeholder.jpg"}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={teacher.name}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white font-medium text-lg shadow-black/50 drop-shadow-md">{teacher.role}</p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg">{teacher.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Donation Banner */}
      <section className="py-12 container px-4 mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl sm:px-16 lg:px-32">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-6 p-4 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <Heart className="h-12 w-12 text-white fill-white" />
            </motion.div>
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              حمایت از آموزش کودکان
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-8 text-white/90 mb-10">
              با کمک‌های مالی خود، می‌توانید آینده کودکان با استعداد اما کم‌بضاعت را تغییر دهید. هر کمک کوچک، گامی بزرگ در مسیر دانایی است
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-zinc-100 border-none font-bold rounded-full px-8 text-lg h-14 shadow-xl">
              <Link href="/donation">همین حالا کمک کنید</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="py-24 bg-muted/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">تازه‌ترین اخبار</h2>
              <Button variant="link" asChild>
                <Link href="/blog">مشاهده آرشیو اخبار</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post, i) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex flex-col bg-background border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <Link href={`/blog/${post._id}`} className="block overflow-hidden relative aspect-video bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-500 bg-zinc-200 group-hover:scale-105 transition-transform duration-500">
                      <span className="text-sm font-medium">تصویر مقاله</span>
                    </div>
                  </Link>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">{post.category}</span>
                      <span>•</span>
                      <time>{new Date(post.createdAt).toLocaleDateString('fa-AF')}</time>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post._id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t flex items-center justify-between">
                      <span className="text-xs font-medium">{post.author}</span>
                      <span className="text-xs text-primary group-hover:underline">ادامه مطلب</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
