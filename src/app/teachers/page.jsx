"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, Linkedin, Mail, GraduationCap, ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TeachersPage() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const res = await fetch("/api/teachers");
                const data = await res.json();
                if (data.success) setTeachers(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchTeachers();
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
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background py-24 sm:py-32">
                {/* Consistent Background */}
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute right-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center pb-12"
                >
                    <div className="mx-auto max-w-2xl">
                        <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary ring-1 ring-inset ring-primary/20">
                            <GraduationCap className="ml-2 h-4 w-4" />
                            کادر آموزشی مجرب
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                            اساتید و مربیان عترت علم
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            با اساتید برجسته ما آشنا شوید که با دلسوزی و تخصص، آینده‌سازان این سرزمین را پرورش می‌دهند ما به آموزش با کیفیت متعهد هستیم
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button size="lg" className="rounded-full px-8 h-12 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" asChild>
                                <Link href="/contact?subject=teacher-application">
                                    همکاری به عنوان استاد
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-lg" asChild>
                                <Link href="/donation">
                                    حمایت از فعالیت‌های آموزشی
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Teacher Grid */}
            <section className="mx-auto max-w-7xl px-6 lg:px-8 -mt-16 pb-20 relative z-10">
                {loading ? (
                    <div className="flex justify-center items-center min-h-[30vh]">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
                            <span className="text-muted-foreground">در حال بارگذاری لیست اساتید...</span>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
                    >
                        {teachers.map((person) => (
                            <motion.div
                                key={person._id}
                                variants={item}
                                className="group relative flex flex-col items-center text-center bg-card rounded-3xl p-8 shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-background shadow-lg mb-6">
                                    {person.imageUrl ? (
                                        <img src={person.imageUrl} alt={person.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-muted">
                                            <User className="h-20 w-20 text-muted-foreground/50" />
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                    {person.name}
                                </h3>
                                <p className="text-sm font-semibold leading-6 text-primary mb-4">
                                    {person.role}
                                </p>
                                <div className="w-full h-px bg-border mb-4"></div>
                                <p className="text-sm leading-6 text-muted-foreground line-clamp-3 mb-6">
                                    {person.bio}
                                </p>
                                <div className="mt-auto flex justify-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                                        <Mail className="h-5 w-5" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
                {!loading && teachers.length === 0 && (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed flex flex-col items-center">
                        <div className="bg-muted p-6 rounded-full mb-4">
                            <Users className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-xl font-bold">هنوز استادی معرفی نشده است</h3>
                        <p className="text-muted-foreground mt-2">لیست اساتید به زودی به‌روزرسانی خواهد شد.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
