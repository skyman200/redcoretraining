'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer id="contact" className="bg-black text-white py-20 px-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
                            {t.footer.title1}<br />{t.footer.title2}
                        </h2>
                        <a
                            href={`mailto:${t.footer.email}`}
                            className="inline-flex items-center text-xl md:text-2xl font-medium hover:underline underline-offset-8 decoration-1"
                        >
                            {t.footer.email}
                            <ArrowUpRight className="ml-2 w-6 h-6" />
                        </a>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="space-y-6">
                            <p className="text-lg text-gray-400 max-w-sm">
                                {t.footer.address}<br />
                                {t.footer.addressDetail}
                            </p>
                        </div>

                        <div className="mt-12 flex gap-8">
                            <Link href="https://blog.naver.com/redcore2021" target="_blank" className="text-lg font-medium hover:text-gray-400 transition-colors">
                                {t.footer.blog}
                            </Link>
                            <Link href="#" className="text-lg font-medium hover:text-gray-400 transition-colors">
                                {t.footer.instagram}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>{t.footer.copyright}</p>
                    <p className="mt-2 md:mt-0">{t.footer.designed}</p>
                </div>
            </div>
        </footer>
    );
}
