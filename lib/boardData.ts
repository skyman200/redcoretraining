import { Post } from '@/types/post';

export const defaultPosts: Post[] = [
    {
        id: 'pilates-basics',
        title: '필라테스 기초 가이드',
        excerpt: '필라테스의 기본 원리와 시작하는 방법에 대한 완벽한 가이드입니다.',
        content: '', // Content is handled in detail page separately for now
        date: '2025-01-15',
        category: 'Pilates',
        image: '/hero.jpg',
        createdAt: '2025-01-15T00:00:00Z',
        files: [
            { name: 'pilates-beginner-guide.pdf', url: '#' },
            { name: 'core-exercises.pdf', url: '#' },
        ]
    },
    {
        id: 'breathing-techniques',
        title: '호흡 트레이닝 테크닉',
        excerpt: '효과적인 호흡 패턴과 건강 개선을 위한 실전 가이드입니다.',
        content: '',
        date: '2025-01-12',
        category: 'Breathing',
        image: '/app.jpg',
        createdAt: '2025-01-12T00:00:00Z',
        files: [
            { name: 'breathing-exercises-guide.pdf', url: '#' },
        ]
    },
    {
        id: 'digital-wellness',
        title: '디지털 웰니스 솔루션',
        excerpt: 'IT 기술을 활용한 건강 관리의 새로운 패러다임을 소개합니다.',
        content: '',
        date: '2025-01-10',
        category: 'Digital Health',
        image: '/center.jpg',
        createdAt: '2025-01-10T00:00:00Z',
        files: [
            { name: 'app-feature-guide.pdf', url: '#' },
            { name: 'digital-wellness-whitepaper.pdf', url: '#' },
        ]
    },
];
