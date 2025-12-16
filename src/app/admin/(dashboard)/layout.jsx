"use client";

import { useState } from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    FileText,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    CreditCard,
    Image as ImageIcon,
    Menu,
    X
} from "lucide-react";

export default function AdminLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="flex h-screen bg-muted/20">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background border-b border-border shadow-sm">
                <span className="font-bold text-lg">پنل مدیریت</span>
                <button onClick={toggleMenu} className="p-2 text-muted-foreground hover:bg-muted rounded-md">
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={closeMenu}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-zinc-900 border-l border-border flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex
                ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
            `}>
                <div className="p-6 border-b border-border hidden lg:block">
                    <h2 className="text-xl font-bold">پنل مدیریت</h2>
                </div>
                {/* Mobile Header in Sidebar */}
                <div className="p-4 border-b border-border lg:hidden flex justify-between items-center">
                    <h2 className="text-xl font-bold">پنل مدیریت</h2>
                    <button onClick={closeMenu} className="p-2 text-muted-foreground hover:bg-muted rounded-md">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link
                        href="/admin"
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        داشبورد
                    </Link>
                    <Link
                        href="/admin/posts"
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <FileText className="h-5 w-5" />
                        مدیریت محتوا
                    </Link>
                    <Link
                        href="/admin/gallery"
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ImageIcon className="h-5 w-5" />
                        گالری تصاویر
                    </Link>
                    <Link
                        href="/admin/donations"
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <CreditCard className="h-5 w-5" />
                        کمک‌های مالی
                    </Link>
                    <Link
                        href="/admin/users"
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Users className="h-5 w-5" />
                        کاربران
                    </Link>
                    <Link
                        href="/admin/teachers"
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Users className="h-5 w-5 text-blue-500" />
                        مدیریت اساتید
                    </Link>
                    <Link
                        href="/admin/messages"
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <MessageSquare className="h-5 w-5" />
                        پیام‌ها
                    </Link>
                    <Link
                        href="/admin/settings"
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Settings className="h-5 w-5" />
                        تنظیمات
                    </Link>
                </nav>
                <div className="p-4 border-t border-border">
                    <Link
                        href="/api/auth/logout"
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        خروج
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-20 lg:pt-8 transition-all duration-300">
                {children}
            </main>
        </div >
    );
}
