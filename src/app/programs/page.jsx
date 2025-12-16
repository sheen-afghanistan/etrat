"use client";

import { motion } from "framer-motion";
import { BookOpen, PenTool, Mic, Globe, Palette, Scissors, GraduationCap, Wifi, Monitor } from "lucide-react";

export default function ProgramsPage() {
    const programs = [
        {
            title: "نویسندگی خلاق (نامه و داستان‌نویسی)",
            description: "تقویت مهارت نوشتن، تفکر انتقادی و اعتمادبه‌نفس.",
            icon: PenTool
        },
        {
            title: "داستان‌گویی",
            description: "احیای فرهنگ شفاهی و تقویت مهارت سخنرانی.",
            icon: Mic
        },
        {
            title: "آموزش زبان انگلیسی (معلمان و شاگردان)",
            description: "گشودن دروازه‌های دانش و فرصت‌های جهانی.",
            icon: Globe
        },
        {
            title: "نقاشی و هنر",
            description: "پرورش خلاقیت و تخلیهٔ احساسات کودکان.",
            icon: Palette
        },
        {
            title: "خیاطی (دختران صنف هفتم به بالا)",
            description: "آموزش مهارت حرفه‌ای برای استقلال اقتصادی.",
            icon: Scissors
        },
        {
            title: "آموزش غیررسمی جبرانی",
            description: "برای کودکانی که از مکتب بازمانده‌اند.",
            icon: BookOpen
        },
        {
            title: "سواد دیجیتال",
            description: "آشنایی با استفادهٔ ایمن از تکنولوژی.",
            icon: Wifi
        },
        {
            title: "آموزش کمپیوتر",
            description: "مهارت‌های ابتدایی کمپیوتر و تایپ.",
            icon: Monitor
        }
    ];

    return (
        <div className="flex flex-col gap-0 pb-16">
            <section className="relative overflow-hidden bg-background py-24 sm:py-32">
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center relative z-10 px-6"
                >
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">
                        برنامه‌های آموزشی
                    </h1>
                    <p className="text-lg leading-8 text-muted-foreground">
                        برنامه‌های عترت علم برای الهام‌بخشی، ترمیم و توانمندسازی ذهن‌های جوان طراحی شده‌اند.
                    </p>
                </motion.div>
            </section>

            <section className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((program, idx) => (
                        <motion.div
                            key={program.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-3xl border bg-background/50 backdrop-blur-sm p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex flex-col items-start text-right">
                                <div className="p-4 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <program.icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl mb-3">{program.title}</h3>
                                <p className="text-muted-foreground">{program.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
