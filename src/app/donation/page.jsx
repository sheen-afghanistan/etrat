"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Mail, Copy, CheckCircle2, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function DonationPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const packages = [
        { price: "15 دالر", title: "بستهٔ آموزشی یک کودک" },
        { price: "50 دالر", title: "حمایت یک‌ماههٔ معلم" },
        { price: "150 دالر", title: "تجهیزات یک صنف" },
        { price: "400 دالر در سال", title: "حمایت کامل یک دختر" },
    ];

    return (
        <div className="flex flex-col gap-0 pb-16">
            <section className="relative overflow-hidden bg-background py-24 sm:py-32">
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute right-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center relative z-10"
                >
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                        <Heart className="w-8 h-8 fill-current" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">
                        چراغی برای آینده باشید
                    </h1>
                    <p className="text-lg leading-8 text-muted-foreground px-6">
                        کمک‌های شما برای خرید کتاب، وسایل آموزشی، ماشین‌های خیاطی، کمپیوتر و حمایت معلمان استفاده می‌شود
                    </p>
                </motion.div>
            </section>

            <section className="mx-auto max-w-7xl px-6 lg:px-8 -mt-12 relative z-10">
                {/* Packages */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {packages.map((pkg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-background border rounded-3xl p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="mx-auto w-12 h-12 border-2 rounded-2xl flex items-center justify-center mb-4 text-primary">
                                    <Package className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-2">{pkg.price}</h3>
                                <p className="text-muted-foreground font-medium">{pkg.title}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Donation Method */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto rounded-[2.5rem] border border-primary/20 bg-primary/5 p-8 md:p-12 text-center"
                >
                    <h2 className="text-2xl font-bold mb-6">روش کمک</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        در حال حاضر کمک‌ها از طریق ایمیل هماهنگ می‌شود. لطفاً برای هماهنگی و دریافت اطلاعات حساب، به ما پیام بفرستید
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                        <div className="relative group w-full sm:w-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex items-center justify-between sm:justify-start gap-3 bg-background border px-4 sm:px-6 py-4 rounded-xl text-sm sm:text-lg font-mono font-bold w-full">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span className="truncate">etrat.elm@gmail.com</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleCopy("etrat.elm@gmail.com")}
                                    className="mr-2 hover:bg-muted shrink-0"
                                >
                                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                        <Button size="lg" className="h-14 px-8 rounded-xl text-lg w-full sm:w-auto" asChild>
                            <a href="mailto:etrat.elm@gmail.com">ارسال ایمیل</a>
                        </Button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
