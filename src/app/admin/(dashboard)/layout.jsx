import Link from "next/link";
import {
    LayoutDashboard,
    FileText,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    CreditCard,
    Image as ImageIcon
} from "lucide-react";

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-screen bg-muted/20">
            {/* Sidebar */}
            <aside className="w-64 bg-background border-l border-border hidden lg:flex flex-col">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-bold">پنل مدیریت</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        داشبورد
                    </Link>
                    <Link
                        href="/admin/posts"
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <FileText className="h-5 w-5" />
                        مدیریت محتوا
                    </Link>
                    <Link
                        href="/admin/gallery"
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ImageIcon className="h-5 w-5" />
                        گالری تصاویر
                    </Link>
                    <Link
                        href="/admin/donations"
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <CreditCard className="h-5 w-5" />
                        کمک‌های مالی
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Users className="h-5 w-5" />
                        کاربران
                    </Link>
                    <Link
                        href="/admin/teachers"
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Users className="h-5 w-5 text-blue-500" />
                        مدیریت اساتید
                    </Link>
                    <Link
                        href="/admin/messages"
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <MessageSquare className="h-5 w-5" />
                        پیام‌ها
                    </Link>
                    <Link
                        href="/admin/settings"
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
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
