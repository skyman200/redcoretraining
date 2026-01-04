'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';

interface BoardPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
}

// Sample data based on Redcore blog content
const posts: BoardPost[] = [
    {
        id: 'pilates-basics',
        title: '필라테스 기초 가이드',
        excerpt: '필라테스의 기본 원리와 시작하는 방법에 대한 완벽한 가이드입니다.',
        date: '2025-01-15',
        category: 'Pilates',
        image: '/hero.jpg',
    },
    {
        id: 'breathing-techniques',
        title: '호흡 트레이닝 테크닉',
        excerpt: '효과적인 호흡 패턴과 건강 개선을 위한 실전 가이드입니다.',
        date: '2025-01-12',
        category: 'Breathing',
        image: '/app.jpg',
    },
    {
        id: 'digital-wellness',
        title: '디지털 웰니스 솔루션',
        excerpt: 'IT 기술을 활용한 건강 관리의 새로운 패러다임을 소개합니다.',
        date: '2025-01-10',
        category: 'Digital Health',
        image: '/center.jpg',
    },
];

export default function BoardCard({ post }: { post: BoardPost }) {
    const { t } = useLanguage();

    return (
        <Link href={`/board/${post.id}`} className="group block">
            <article className="bg-white border border-black hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[16/9] overflow-hidden">
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <span className="sr-only">{post.title}</span>
                    </div>
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="px-3 py-1 bg-black text-white text-xs uppercase font-bold tracking-wider">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Calendar size={14} />
                            <time dateTime={post.date}>{post.date}</time>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold group-hover:underline underline-offset-4 decoration-2">
                        {post.title}
                    </h2>

                    <p className="text-gray-600 line-clamp-2">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                        {t.board.viewPost}
                        <ArrowRight size={16} />
                    </div>
                </div>
            </article>
        </Link>
    );
}

export { posts };
