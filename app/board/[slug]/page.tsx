'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Download } from 'lucide-react';
import { posts as defaultPosts } from '@/components/BoardCard';
import { use } from 'react';

// Detailed content for default posts
const postContent: Record<string, {
    content: string;
    files: Array<{ name: string; url: string; }>;
}> = {
    'pilates-basics': {
        content: `
# 필라테스 기초 가이드

필라테스는 신체의 코어 근육을 강화하고 자세를 개선하는 데 중점을 둔 운동 방법입니다.

## 핵심 원리

1. **호흡 (Breathing)**: 적절한 호흡은 모든 필라테스 동작의 기초입니다.
2. **집중 (Concentration)**: 각 동작에 집중하여 정확하게 수행합니다.
3. **중심 (Centering)**: 신체의 중심(코어)에서 모든 움직임이 시작됩니다.
4. **조절 (Control)**: 모든 동작을 완전히 제어합니다.
5. **정밀성 (Precision)**: 정확한 자세와 동작이 중요합니다.
6. **흐름 (Flow)**: 동작은 부드럽고 우아하게 연결됩니다.

## 시작하기

필라테스를 처음 시작하는 분들을 위한 기본 동작과 주의사항을 소개합니다.
전문 강사의 지도 아래 올바른 자세를 익히는 것이 중요합니다.
    `,
        files: [
            { name: 'pilates-beginner-guide.pdf', url: '#' },
            { name: 'core-exercises.pdf', url: '#' },
        ]
    },
    'breathing-techniques': {
        content: `
# 호흡 트레이닝 테크닉

올바른 호흡법은 건강과 웰빙의 핵심입니다.

## 효과적인 호흡 패턴

### 1. 복식 호흡 (Diaphragmatic Breathing)
복부를 이용한 깊은 호흡으로 스트레스 감소와 산소 공급 증가에 도움이 됩니다.

### 2. 박스 호흡 (Box Breathing)
4초 흡입, 4초 정지, 4초 호출, 4초 정지를 반복하여 마음을 안정시킵니다.

### 3. 교대 비강 호흡 (Alternate Nostril Breathing)
좌우 비강을 번갈아 사용하여 신경계 균형을 맞춥니다.

## 건강 효과

- 스트레스 감소
- 혈압 조절
- 집중력 향상
- 수면의 질 개선
    `,
        files: [
            { name: 'breathing-exercises-guide.pdf', url: '#' },
        ]
    },
    'digital-wellness': {
        content: `
# 디지털 웰니스 솔루션

기술과 건강의 완벽한 조화를 경험하세요.

## 레드코어 앱의 특징

### 1. 개인 맞춤형 프로그램
AI 기반 분석으로 개인에게 최적화된 운동과 호흡 프로그램을 제공합니다.

### 2. 실시간 모니터링
운동 중 자세와 호흡을 실시간으로 분석하여 피드백을 제공합니다.

### 3. 데이터 기반 진행 상황 추적
장기적인 건강 데이터를 수집하고 분석하여 개선 사항을 확인할 수 있습니다.

### 4. 전문가 콘텐츠
현장 전문가가 제작한 고품질 교육 콘텐츠를 제공합니다.

## 디지털 헬스케어의 미래

오프라인 센터의 전문성과 디지털 기술의 편리함이 만나 새로운 웰니스 경험을 만들어갑니다.
    `,
        files: [
            { name: 'app-feature-guide.pdf', url: '#' },
            { name: 'digital-wellness-whitepaper.pdf', url: '#' },
        ]
    },
};

function BoardDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t } = useLanguage();
    const [post, setPost] = useState<any>(null);
    const [detail, setDetail] = useState<any>(null);

    useEffect(() => {
        // Try to find in admin posts first
        const savedPosts = localStorage.getItem('admin_posts');
        if (savedPosts) {
            const adminPosts = JSON.parse(savedPosts);
            const adminPost = adminPosts.find((p: any) => p.id === slug);
            if (adminPost) {
                setPost(adminPost);
                setDetail({ content: adminPost.content, files: adminPost.files || [] });
                return;
            }
        }

        // Fallback to default posts
        const defaultPost = defaultPosts.find(p => p.id === slug);
        if (defaultPost) {
            setPost(defaultPost);
            setDetail(postContent[slug]);
        }
    }, [slug]);

    if (!post || !detail) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl">Post not found</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-white text-black"
        >
            <Header />

            <main className="pt-32 pb-20">
                <article className="container mx-auto px-6 max-w-4xl">
                    <Link
                        href="/board"
                        className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:underline underline-offset-4"
                    >
                        <ArrowLeft size={16} />
                        {t.board.backToList}
                    </Link>

                    <div className="relative aspect-[21/9] mb-12 overflow-hidden rounded-lg">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            <span className="px-4 py-2 bg-black text-white text-xs uppercase font-bold tracking-wider">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2 text-gray-500">
                                <Calendar size={16} />
                                <time dateTime={post.date}>{post.date}</time>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-black via-red-600 to-black bg-clip-text text-transparent">
                            {post.title}
                        </span>
                    </h1>

                    <div className="prose prose-lg max-w-none mb-12">
                        {detail.content.split('\n').map((line: string, i: number) => (
                            <p key={i} className="whitespace-pre-wrap">{line}</p>
                        ))}
                    </div>

                    {detail.files.length > 0 && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Download size={24} />
                                다운로드 자료
                            </h2>
                            <div className="space-y-4">
                                {detail.files.map((file: { name: string; url: string }, index: number) => (
                                    <a
                                        key={index}
                                        href={file.url}
                                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-red-600 hover:shadow-lg transition-all group"
                                    >
                                        <span className="font-medium group-hover:text-red-600 transition-colors">
                                            {file.name}
                                        </span>
                                        <Download size={20} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </main>

            <Footer />
        </motion.div>
    );
}

export default function BoardDetailPageWrapper({ params }: { params: Promise<{ slug: string }> }) {
    return (
        <LanguageProvider>
            <BoardDetailPage params={params} />
        </LanguageProvider>
    );
}
