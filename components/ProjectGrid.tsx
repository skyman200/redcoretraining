'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface Project {
    id: string;
    titleKey: 'pilates' | 'digital' | 'breathing';
    image: string;
    link: string;
}

const projects: Project[] = [
    {
        id: '01',
        titleKey: 'pilates',
        image: '/hero.jpg',
        link: '#',
    },
    {
        id: '02',
        titleKey: 'digital',
        image: '/app.jpg',
        link: '#',
    },
    {
        id: '03',
        titleKey: 'breathing',
        image: '/center.jpg',
        link: '#',
    },
];

export default function ProjectGrid() {
    const { t } = useLanguage();

    return (
        <section id="work" className="py-20 px-6">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-12 border-b border-black pb-4">
                    <h2 className="text-4xl font-bold uppercase tracking-tighter">
                        <span className="bg-gradient-to-r from-black via-red-600 to-black dark:from-white dark:via-red-400 dark:to-white bg-clip-text text-transparent">
                            {t.projectGrid.title}
                        </span>
                    </h2>
                    <span className="text-sm font-medium">{t.projectGrid.years}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {projects.map((project) => (
                        <Link key={project.id} href={project.link} className="group block">
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                                    <span className="sr-only">{t.projectGrid.projects[project.titleKey].title}</span>
                                </div>
                                <Image
                                    src={project.image}
                                    alt={t.projectGrid.projects[project.titleKey].title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold uppercase leading-none mb-1 group-hover:underline underline-offset-4 decoration-2">
                                        {t.projectGrid.projects[project.titleKey].title}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                                        {t.projectGrid.projects[project.titleKey].category}
                                    </p>
                                </div>
                                <span className="text-xs font-bold border border-black rounded-full px-2 py-1">
                                    {project.id}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
