"use client";

import { useState, useEffect } from "react";
import { Users, Loader2, Shield } from "lucide-react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                if (data.success) {
                    setUsers(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
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
                <h1 className="text-3xl font-bold tracking-tight">مدیریت کاربران</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-5 w-5" />
                    <span>تعداد کاربران: {users.length}</span>
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-right">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">نام کاربری</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">ایمیل</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">نقش</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">تاریخ عضویت</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {users.map((user) => (
                                <tr key={user._id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{user.username}</td>
                                    <td className="p-4 align-middle">{user.email}</td>
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-2">
                                            {user.isAdmin ? (
                                                <Shield className="h-4 w-4 text-blue-500" />
                                            ) : (
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                            )}
                                            {user.isAdmin ? "مدیر" : "کاربر"}
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        {new Date(user.createdAt).toLocaleDateString("fa-AF")}
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                        هیچ کاربری یافت نشد.
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
