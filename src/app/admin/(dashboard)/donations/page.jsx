"use client";

import { useState, useEffect } from "react";
import { CreditCard, Loader2 } from "lucide-react";

export default function DonationsPage() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDonations() {
            try {
                const res = await fetch("/api/donations");
                const data = await res.json();
                if (data.success) {
                    setDonations(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch donations", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDonations();
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">مدیریت کمک‌های مالی</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard className="h-5 w-5" />
                    <span>کل کمک‌ها: {donations.length}</span>
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-right">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">نام اهداکننده</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">مبلغ</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">ارز</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">تاریخ</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">وضعیت</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {donations.map((donation) => (
                                <tr key={donation._id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{donation.donorName}</td>
                                    <td className="p-4 align-middle">{donation.amount.toLocaleString()}</td>
                                    <td className="p-4 align-middle">{donation.currency}</td>
                                    <td className="p-4 align-middle">{new Date(donation.date).toLocaleDateString("fa-AF")}</td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                                            ${donation.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {donation.status === 'completed' ? 'موفق' :
                                                donation.status === 'pending' ? 'در انتظار' : 'ناموفق'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {donations.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                        هیچ کمک مالی ثبت نشده است.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
