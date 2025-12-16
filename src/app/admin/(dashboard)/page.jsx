import {
    Users,
    CreditCard,
    Mail,
    FileText,
    TrendingUp,
    Package,
    Calendar
} from "lucide-react";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import Teacher from "@/models/Teacher";
import Message from "@/models/Message";
import Donation from "@/models/Donation";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";

// Helper to format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fa-AF", {
        style: "currency",
        currency: "AFN",
        maximumFractionDigits: 0,
    }).format(amount);
};

export default async function AdminDashboard() {
    await dbConnect();

    // Fetch Stats
    const postCount = await Post.countDocuments();
    const teacherCount = await Teacher.countDocuments();
    const messageCount = await Message.countDocuments();
    const unreadMessageCount = await Message.countDocuments({ read: false });

    // Calculate total donations
    const donationStats = await Donation.aggregate([
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
                count: { $sum: 1 }
            }
        }
    ]);
    const totalDonations = donationStats[0]?.totalAmount || 0;
    const donationCount = donationStats[0]?.count || 0;

    // Fetch Recent Data
    const recentDonations = await Donation.find().sort({ createdAt: -1 }).limit(5);
    const recentMessages = await Message.find().sort({ createdAt: -1 }).limit(5);

    const stats = [
        {
            name: "مجموع مقالات",
            value: postCount.toLocaleString('fa-IR'),
            icon: FileText,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
        },
        {
            name: "اساتید",
            value: teacherCount.toLocaleString('fa-IR'),
            icon: Users,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
        },
        {
            name: "کمک‌های مالی",
            value: formatCurrency(totalDonations),
            subValue: `${donationCount} تراکنش`,
            icon: CreditCard,
            color: "text-green-500",
            bgColor: "bg-green-500/10",
        },
        {
            name: "پیام‌ها",
            value: messageCount.toLocaleString('fa-IR'),
            subValue: `${unreadMessageCount} خوانده نشده`,
            icon: Mail,
            color: "text-orange-500",
            bgColor: "bg-orange-500/10",
        },
    ];

    return (
        <div className="space-y-8" dir="rtl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">داشبورد</h1>
                <p className="text-muted-foreground mt-2">
                    نمای کلی وضعیت مرکز آموزشی عترت علم
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-shadow"
                    >
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-muted-foreground">{stat.name}</span>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            {stat.subValue && (
                                <p className="text-xs text-muted-foreground mt-1">{stat.subValue}</p>
                            )}
                        </div>
                        <div className={`p-4 rounded-xl ${stat.bgColor} ${stat.color}`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Donations */}
                <div className="rounded-2xl border bg-card text-card-foreground shadow-sm col-span-full lg:col-span-4">
                    <div className="p-6 border-b">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Package className="w-5 h-5 text-primary" />
                            آخرین کمک‌های مالی
                        </h3>
                    </div>
                    <div className="p-6">
                        {recentDonations.length > 0 ? (
                            <div className="space-y-6">
                                {recentDonations.map((donation) => (
                                    <div key={donation._id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 font-bold text-lg">
                                                $
                                            </div>
                                            <div>
                                                <p className="font-medium">{donation.donorName}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatDistanceToNow(new Date(donation.createdAt), { addSuffix: true, locale: faIR })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-green-600">{formatCurrency(donation.amount)}</p>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${donation.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                donation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {donation.status === 'completed' ? 'تکمیل شده' :
                                                    donation.status === 'pending' ? 'در انتظار' : 'ناموفق'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                هنوز هیچ کمکی ثبت نشده است.
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Messages */}
                <div className="rounded-2xl border bg-card text-card-foreground shadow-sm col-span-full lg:col-span-3">
                    <div className="p-6 border-b bg-muted/20">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Mail className="w-5 h-5 text-primary" />
                            پیام‌های اخیر
                        </h3>
                    </div>
                    <div className="p-0">
                        {recentMessages.length > 0 ? (
                            <div className="divide-y">
                                {recentMessages.map((msg) => (
                                    <div key={msg._id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-semibold text-sm group-hover:text-primary transition-colors">{msg.name}</span>
                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                                {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true, locale: faIR })}
                                            </span>
                                        </div>
                                        <p className="text-xs font-medium text-foreground/80 mb-1 truncate">{msg.subject || "(بدون عنوان)"}</p>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {msg.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-muted-foreground">
                                صندوق پیام خالی است.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
