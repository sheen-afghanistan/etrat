"use client";

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, Handshake, Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <div className="flex flex-col gap-0 pb-16">
            <section className="relative overflow-hidden bg-background py-24 sm:py-32">
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute right-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center relative z-10"
                >
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">
                        تماس با ما
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        ما مشتاق شنیدن نظرات و پیشنهادات شما هستیم. راه‌های ارتباطی ما همیشه
                        باز است
                    </p>
                </motion.div>
            </section>

            <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                            اطلاعات تماس
                        </h2>
                        <div className="space-y-8">
                            <div className="flex gap-4 items-start">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white shrink-0">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">آدرس</h3>
                                    <p className="mt-2 text-muted-foreground">
                                        کابل، افغانستان، کوه چهل دختران عقب مکتب سیدالشهدا بالاتر از چشمه
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white shrink-0">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">تلفن</h3>
                                    <p className="mt-2 text-muted-foreground">+93 700 000 000</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white shrink-0">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">ایمیل</h3>
                                    <p className="mt-2 text-muted-foreground">etrat.elm@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 h-80 w-full rounded-2xl bg-zinc-200 overflow-hidden flex items-center justify-center">
                            {/* Map Placeholder */}
                            <span className="text-muted-foreground">نقشه گوگل</span>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-muted/50 p-8 rounded-2xl border border-border">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                            ارسال پیام
                        </h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-foreground">
                                        نام
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-foreground">
                                        نام خانوادگی
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-foreground">
                                    ایمیل
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-foreground">
                                    پیام
                                </label>
                                <div className="mt-2.5">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                                        defaultValue={""}
                                    />
                                </div>
                            </div>
                            <Button type="submit" size="lg" className="w-full sm:w-auto gap-2">
                                ارسال پیام <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Get Involved Section */}
            <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 bg-muted/20 w-full rounded-3xl mb-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                        همکاری با ما
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        مرکز عترت علم با همکاری داوطلبان و نهادها رشد می‌کند
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Volunteering */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-background p-8 rounded-2xl shadow-sm border text-center flex flex-col items-center"
                    >
                        <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <Handshake className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">فرصت‌های داوطلبی</h3>
                        <ul className="text-muted-foreground space-y-2 mb-6">
                            <li>کمک‌معلم</li>
                            <li>استاد خیاطی و هنر</li>
                            <li>استاد دیجیتال</li>
                            <li>مستندسازی داستان‌ها</li>
                        </ul>
                    </motion.div>

                    {/* Partnerships */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-background p-8 rounded-2xl shadow-sm border text-center flex flex-col items-center"
                    >
                        <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">همکاری و شراکت</h3>
                        <p className="text-muted-foreground mb-6">
                            همکاری با نهادها، مکاتب و حامیان مالی برای گسترش اثرگذاری
                        </p>
                    </motion.div>

                    {/* Careers */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-background p-8 rounded-2xl shadow-sm border text-center flex flex-col items-center"
                    >
                        <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <Briefcase className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">فرصت‌های کاری</h3>
                        <p className="text-muted-foreground mb-4">
                            برای پیوستن به تیم ما، خلص سوانح خود را ارسال کنید
                        </p>
                        <a href="mailto:etrat.elm@gmail.com" className="bg-primary/5 text-primary px-4 py-2 rounded-lg font-mono text-sm hover:bg-primary/10 transition-colors">
                            etrat.elm@gmail.com
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
