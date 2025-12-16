import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const navigation = {
    main: [
        { name: "خانه", href: "/" },
        { name: "درباره ما", href: "/about" },
        { name: "استادان", href: "/teachers" },
        { name: "گالری", href: "/gallery" },
        { name: "مقالات", href: "/blog" },
        { name: "تماس با ما", href: "/contact" },
        { name: "حمایت مالی", href: "/donation" },
    ],
    legal: [
        { name: "حریم خصوصی", href: "/privacy" },
        { name: "قوانین و مقررات", href: "/terms" },
    ],
    social: [
        {
            name: "Facebook",
            href: "#",
            icon: Facebook,
        },
        {
            name: "Twitter",
            href: "#",
            icon: Twitter,
        },
        {
            name: "Instagram",
            href: "#",
            icon: Instagram,
        },
    ],
};

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                سایدبار
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <GraduationCap className="h-10 w-10" />
                            <span className="text-2xl font-bold">عترت علم</span>
                        </Link>
                        <p className="text-sm leading-6 text-primary-foreground/80 max-w-xs">
                            مرکز آموزشی عترت علم، پیشرو در ارائه خدمات آموزشی با کیفیت برای آینده‌سازان کشور
                        </p>
                        <div className="flex gap-x-6">
                            {navigation.social.map((item) => (
                                <Link key={item.name} href={item.href} className="text-primary-foreground/60 hover:text-white">
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">دسترسی سریع</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.main.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-primary-foreground/70 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">تماس با ما</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="flex items-center gap-2 text-sm leading-6 text-primary-foreground/70">
                                        <MapPin className="h-4 w-4" />
                                       کوه چهل دختران عقب مکتب سیدالشهدا بالاتر از چشمه کابل، افغانستان
                                    </li>
                                    <li className="flex items-center gap-2 text-sm leading-6 text-primary-foreground/70">
                                        <Phone className="h-4 w-4" />
                                        +93 700 000 000
                                    </li>
                                    <li className="flex items-center gap-2 text-sm leading-6 text-primary-foreground/70">
                                        <Mail className="h-4 w-4" />
                                        info@etrat-elm.com
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">قوانین</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-primary-foreground/70 hover:text-white">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-primary-foreground/50">
                        &copy; {new Date().getFullYear()} مرکز آموزشی عترت علم. تمامی حقوق محفوظ است
                    </p>
                </div>
            </div>
        </footer>
    );
}
