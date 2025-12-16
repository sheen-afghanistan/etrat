"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon, ZoomIn, Calendar, Clock, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchImages() {
            try {
                const res = await fetch("/api/gallery");
                const data = await res.json();
                if (data.success) {
                    setImages(data.data);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchImages();
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
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <div className="flex flex-col gap-0 pb-16">
            <section className="relative overflow-hidden bg-background py-24 sm:py-32">
                {/* Consistent Background */}
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute right-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center relative z-10"
                >
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">
                        گالری و رویدادها
                    </h1>
                    <p className="text-lg leading-8 text-muted-foreground">
                        تصاویر فعالیت‌ها و تقویم رویدادهای آینده مرکز عترت علم
                    </p>
                </motion.div>
            </section>

            {/* Events Section */}
            <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
                <div className="bg-muted/30 rounded-3xl p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-primary/10 p-3 rounded-xl text-primary">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold">تقویم رویدادها</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Placeholder Event */}
                        <div className="bg-background border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg transition-all">
                            <div className="flex justify-between items-start">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">به‌زودی</span>
                                <span className="text-sm text-muted-foreground">1403/01/01</span>
                            </div>
                            <h3 className="font-bold text-lg">آغاز دوره‌های جدید آموزشی</h3>
                            <div className="mt-auto space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>8:00 صبح</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>مرکز آموزشی عترت علم</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-background border rounded-2xl p-6 flex flex-col gap-4 text-center justify-center items-center text-muted-foreground min-h-[200px]">
                            <p>رویداد دیگری فعلاً وجود ندارد.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 lg:px-8 -mt-10 relative z-10">
                <h2 className="text-2xl font-bold mb-8 pr-4 border-r-4 border-primary">تصاویر صنف‌ها و فعالیت‌ها</h2>
                {loading ? (
                    <div className="flex justify-center items-center min-h-[30vh]">
                        <div className="animate-pulse text-muted-foreground">در حال بارگذاری تصاویر...</div>
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                    >
                        {images.map((img) => (
                            <motion.div
                                key={img._id}
                                variants={item}
                                className="break-inside-avoid relative group rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                            >
                                <img
                                    src={img.imageUrl}
                                    alt={img.title}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <h3 className="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-right">{img.title}</h3>
                                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <span className="inline-flex items-center text-xs font-medium text-white/80 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm hover:bg-white/20">
                                            <ZoomIn className="w-3 h-3 ml-1" />
                                            بزرگنمایی
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {!loading && images.length === 0 && (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed flex flex-col items-center">
                        <div className="bg-muted p-6 rounded-full mb-4">
                            <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-xl font-bold">هنوز تصویری ثبت نشده است</h3>
                        <p className="text-muted-foreground mt-2 max-w-md mx-auto">ما در حال گردآوری تصاویر برای نمایش به شما هستیم. لطفا بعدا مراجعه کنید.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
