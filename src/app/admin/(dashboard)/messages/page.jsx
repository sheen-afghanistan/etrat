"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Loader2 } from "lucide-react";

export default function MessagesPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const res = await fetch("/api/messages");
                const data = await res.json();
                if (data.success) {
                    setMessages(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch messages", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMessages();
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
                <h1 className="text-3xl font-bold tracking-tight">پیام‌های کاربران</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="h-5 w-5" />
                    <span>تعداد پیام‌ها: {messages.length}</span>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {messages.map((msg) => (
                    <div key={msg._id} className="rounded-lg border bg-card p-6 shadow-sm">
                        <div className="flex items-start justify-between">
                            <h3 className="font-semibold">{msg.subject || "بدون عنوان"}</h3>
                            <span className="text-xs text-muted-foreground">
                                {new Date(msg.createdAt).toLocaleDateString("fa-AF")}
                            </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                            {msg.message}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground border-t pt-4">
                            <span className="font-medium">{msg.name}</span>
                            <span>•</span>
                            <span>{msg.email}</span>
                        </div>
                    </div>
                ))}
                {messages.length === 0 && (
                    <div className="col-span-full rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                        صندوق پیام‌ها خالی است.
                    </div>
                )}
            </div>
        </div>
    );
}
