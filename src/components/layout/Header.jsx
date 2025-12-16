"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
    { name: "خانه", href: "/" },
    { name: "درباره ما", href: "/about" },
    { name: "استادان", href: "/teachers" },
    { name: "گالری", href: "/gallery" },
    { name: "مقالات آموزشی", href: "/blog" },
    { name: "تماس با ما", href: "/contact" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <span className="sr-only">مرکز آموزشی عترت علم</span>
                        <GraduationCap className="h-8 w-8" />
                        <span className="text-xl font-bold">عترت علم</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">باز کردن منو</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-foreground hover:text-primary/80 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Button asChild variant="default">
                        <Link href="/donation">حمایت مالی</Link>
                    </Button>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-background lg:hidden"
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                                <GraduationCap className="h-8 w-8" />
                                <span className="text-xl font-bold">عترت علم</span>
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-muted-foreground"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">بستن منو</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="flow-root px-4 bg-primary-foreground">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <Button asChild className="w-full">
                                        <Link href="/donation" onClick={() => setMobileMenuOpen(false)}>
                                            حمایت مالی
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
