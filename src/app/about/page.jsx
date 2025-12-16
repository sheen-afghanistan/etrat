"use client";

import { motion } from "framer-motion";
import { Award, Book, Users, Heart, Lightbulb, ShieldCheck, Target, Globe, Home } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    const values = [
        {
            title: "آموزش برای کرامت انسانی",
            description: "باور به اینکه آموزش، مسیر ما برای کرامت انسانی است",
            icon: Award
        },
        {
            title: "مشارکت جامعه",
            description: "همکاری نزدیک با جامعه برای دستیابی به اهداف مشترک",
            icon: Users
        },
        {
            title: "برابری جنسیتی",
            description: "تضمین دسترسی برابر دختران و پسران به آموزش باکیفیت",
            icon: Heart
        },
        {
            title: "خلاقیت و تاب‌آوری",
            description: "پرورش ذهن‌های خلاق و مقاوم در برابر چالش‌ها",
            icon: Lightbulb
        },
        {
            title: "شفافیت و اثرگذاری",
            description: "تعهد به شفافیت در عملکرد و ایجاد تأثیر مثبت واقعی",
            icon: ShieldCheck
        }
    ];

    const goals = [
        {
            title: "آموزش 20,000 کودک",
            icon: Book
        },
        {
            title: "توانمندسازی 2,000 زن جوان",
            icon: Users
        },
        {
            title: "ایجاد الگوی پایدار مکاتب محلی قابل تکرار",
            icon: Home
        }
    ];

    return (
        <div className="flex flex-col gap-0 pb-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background py-24 sm:py-32">
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute right-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center relative z-10 px-6"
                >
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">
                        درباره <span className="text-primary">عترت علم</span>
                    </h1>
                    <p className="mt-6 text-xl leading-8 text-muted-foreground">
                        مرکز آموزشی عترت علم باور دارد که هیچ کودکی، به‌ویژه دختران، نباید از حق آموزش محروم شود. آموزش، مسیر ما برای کرامت انسانی، پایداری و آینده‌ای بهتر است
                    </p>
                </motion.div>
            </section>

            {/* Story & Mission Section */}
            <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                                داستان ما
                            </h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                در سال 2020 و هم‌زمان با شدت‌گرفتن بحران کرونا، خانواده‌های بی‌جا‌شده در دامنه‌های کوه‌چهل‌دختران کابل زندگی می‌کردند. کودکان بدون کتاب، مکتب و فضای امن آموزشی بودند. گروهی از آموزگاران محلی با ایمان به قدرت آموزش، مرکز آموزشی عترت علم را تأسیس کردند. این مرکز از یک صنف کوچک به یک پایگاه آموزشی جامعه‌محور تبدیل شد
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                                مأموریت
                            </h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                ارائهٔ آموزش و مهارت‌آموزی جامعه‌محور برای توانمندسازی کودکان و دختران جهت ایفای نقش مؤثر در خانواده و جامعه
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="relative h-[300px] w-full rounded-3xl bg-zinc-200 overflow-hidden shadow-xl">
                            <Image
                                src="/children.jpeg"
                                alt="کودکان عترت علم"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                            <h2 className="text-2xl font-bold tracking-tight text-primary mb-4 flex items-center gap-2">
                                <Target className="w-6 h-6" />
                                چشم‌انداز
                            </h2>
                            <p className="text-lg text-foreground/80">
                                جامعه‌ای که در آن هر کودک به آموزش امن، باکیفیت و معنادار دسترسی داشته باشد
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="mx-auto max-w-7xl px-4 lg:px-8 mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        ارزش‌های ما
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, idx) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-muted/30 p-8 rounded-2xl hover:bg-muted/50 transition-colors border border-border"
                        >
                            <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit text-primary">
                                <value.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                            <p className="text-muted-foreground">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 2030 Goals Section */}
            <section className="mx-auto max-w-7xl px-4 lg:px-8 pb-24">
                <div className="rounded-[2.5rem] bg-black text-white p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-[120px]"></div>

                    <div className="relative z-10 text-center mb-12">
                        <h2 className="text-3xl font-bold sm:text-5xl mb-4">اهداف 2030</h2>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg">
                            چشم‌انداز ما برای یک دهه آینده، ایجاد تغییر پایدار در سطح جامعه است
                        </p>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {goals.map((goal, idx) => (
                            <motion.div
                                key={goal.title}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.15 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/20 transition-all text-center h-full"
                            >
                                <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                                    <goal.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold leading-tight">{goal.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
