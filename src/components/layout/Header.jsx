"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap, Phone, MapPin } from "lucide-react";
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
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-[100] w-[80%] max-w-sm border-l border-border bg-background shadow-xl lg:hidden"
                        >
                            <div className="flex h-full flex-col">
                                <div className="flex items-center justify-between border-b px-4 py-4">
                                    <Link
                                        href="/"
                                        className="-m-1.5 p-1.5 flex items-center gap-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <GraduationCap className="h-8 w-8 text-primary" />
                                        <span className="text-xl font-bold">عترت علم</span>
                                    </Link>
                                    <button
                                        type="button"
                                        className="-m-2.5 rounded-md p-2.5 text-muted-foreground hover:text-foreground transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="sr-only">بستن منو</span>
                                        <X className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto px-4 py-6">
                                    <div className="flex flex-col space-y-2">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="mt-8 space-y-4 border-t pt-6">
                                        <Button asChild className="w-full">
                                            <Link href="/donation" onClick={() => setMobileMenuOpen(false)}>
                                                حمایت مالی
                                            </Link>
                                        </Button>

                                        <div className="space-y-4 pt-4">
                                            <h4 className="text-sm font-medium text-muted-foreground">تماس با ما</h4>
                                            <div className="flex items-center gap-3 text-sm text-foreground/80">
                                                <Phone className="h-4 w-4" />
                                                <span dir="ltr">+93 78 888 8888</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-foreground/80">
                                                <MapPin className="h-4 w-4" />
                                                <span>کابل، افغانستان</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
