"use client";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">تنظیمات سایت</h1>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
                <form className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                عنوان وبسایت
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue="مرکز آموزشی عترت علم"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                ایمیل تماس
                            </label>
                            <input
                                type="email"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue="etrat-elm@gmail.com"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                توضیحات متا (SEO)
                            </label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue="وبسایت رسمی مرکز آموزشی عترت علم - ارائه دهنده خدمات آموزشی با کیفیت در افغانستان"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="button">
                            <Save className="mr-2 h-4 w-4" />
                            ذخیره تغییرات
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
