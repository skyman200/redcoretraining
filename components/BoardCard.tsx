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
    files?: Array<{ name: string; url: string }>;
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
        files: [
            { name: 'pilates-beginner-guide.pdf', url: '#' },
            { name: 'core-exercises.pdf', url: '#' },
        ]
    },
    {
        id: 'breathing-techniques',
        title: '호흡 트레이닝 테크닉',
        excerpt: '효과적인 호흡 패턴과 건강 개선을 위한 실전 가이드입니다.',
        date: '2025-01-12',
        category: 'Breathing',
        image: '/app.jpg',
        files: [
            { name: 'breathing-exercises-guide.pdf', url: '#' },
        ]
    },
    {
        id: 'digital-wellness',
        title: '디지털 웰니스 솔루션',
        excerpt: 'IT 기술을 활용한 건강 관리의 새로운 패러다임을 소개합니다.',
        date: '2025-01-10',
        category: 'Digital Health',
        image: '/center.jpg',
        files: [
            { name: 'app-feature-guide.pdf', url: '#' },
            { name: 'digital-wellness-whitepaper.pdf', url: '#' },
        ]
    },
];

export default function BoardCard({ post }: { post: BoardPost }) {
    const { t } = useLanguage();

    return (
        <div className="group block h-full">
            <article className="bg-white border border-black hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <Link href={`/board/${post.id}`} className="block relative aspect-[16/9] overflow-hidden">
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
                </Link>

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between text-sm">
                        <span className="px-3 py-1 bg-black text-white text-xs uppercase font-bold tracking-wider">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Calendar size={14} />
                            <time dateTime={post.date}>{post.date}</time>
                        </div>
                    </div>

                    <Link href={`/board/${post.id}`} className="block">
                        <h2 className="text-2xl font-bold group-hover:underline underline-offset-4 decoration-2">
                            {post.title}
                        </h2>
                    </Link>

                    <p className="text-gray-600 line-clamp-2 flex-1">
                        {post.excerpt}
                    </p>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <Link href={`/board/${post.id}`} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all">
                            {t.board.viewPost}
                            <ArrowRight size={16} />
                        </Link>

                        {post.files && post.files.length > 0 && (
                            <div className="flex gap-2">
                                {post.files.map((file, idx) => (
                                    <a
                                        key={idx}
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        title={file.name}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" x2="12" y1="15" y2="3" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
}

export { posts };
