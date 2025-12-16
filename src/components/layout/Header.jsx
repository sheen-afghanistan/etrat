"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Menu,
    X,
    GraduationCap,
    Phone,
    MapPin,
    Home,
    Info,
    Users,
    Image as ImageIcon,
    BookOpen,
    Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "خانه", href: "/", icon: Home },
    { name: "درباره ما", href: "/about", icon: Info },
    { name: "استادان", href: "/teachers", icon: Users },
    { name: "گالری", href: "/gallery", icon: ImageIcon },
    { name: "مقالات آموزشی", href: "/blog", icon: BookOpen },
    { name: "تماس با ما", href: "/contact", icon: Phone },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <>
            <header
                className={cn(
                    "sticky top-0 z-[999] w-full transition-all duration-300",
                    scrolled
                        ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
                        : "bg-transparent border-transparent"
                )}
            >
                <nav
                    className="mx-auto flex h-16 max-w-7xl items-center justify-between p-4 lg:px-8"
                    aria-label="Global"
                >
                    {/* Logo */}
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                                عترت علم
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">باز کردن منو</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex lg:gap-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative text-sm font-medium leading-6 text-foreground/80 hover:text-primary transition-colors group py-2"
                            >
                                {item.name}
                                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary origin-right scale-x-0 transition-transform group-hover:scale-x-100" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Action */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Button asChild className="gap-2 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                            <Link href="/donation">
                                <Heart className="w-4 h-4 fill-current" />
                                حمایت مالی
                            </Link>
                        </Button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-[1000] w-full max-w-sm border-l border-border bg-background/95 backdrop-blur-xl shadow-2xl lg:hidden"
                        >
                            <div className="flex h-full flex-col">
                                <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                                    <Link
                                        href="/"
                                        className="-m-1.5 p-1.5 flex items-center gap-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                                            <GraduationCap className="h-5 w-5" />
                                        </div>
                                        <span className="text-lg font-bold">عترت علم</span>
                                    </Link>
                                    <button
                                        type="button"
                                        className="-m-2.5 rounded-full p-2.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="sr-only">بستن منو</span>
                                        <X className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto px-6 py-6">
                                    <div className="flex flex-col space-y-1">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="group flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="mt-8 space-y-6 border-t border-border/50 pt-6">
                                        <Button asChild className="w-full h-11 gap-2 text-base shadow-md">
                                            <Link href="/donation" onClick={() => setMobileMenuOpen(false)}>
                                                <Heart className="w-5 h-5 fill-current" />
                                                حمایت مالی
                                            </Link>
                                        </Button>

                                        <div className="space-y-4 rounded-xl bg-accent/50 p-4">
                                            <h4 className="text-sm font-medium text-foreground">تماس با ما</h4>
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <Phone className="h-4 w-4" />
                                                </div>
                                                <span dir="ltr" className="font-medium">+93 78 888 8888</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <MapPin className="h-4 w-4" />
                                                </div>
                                                <span className="font-medium">کابل، افغانستان</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
