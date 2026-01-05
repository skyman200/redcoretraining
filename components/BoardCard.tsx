import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { Post } from '@/types/post';

export default function BoardCard({ post }: { post: Post }) {
    const { t } = useLanguage();

    return (
        <div className="group block h-full">
            <article className="bg-white border border-black hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <Link href={`/board/${post.id}`} className="block relative aspect-[16/9] overflow-hidden">
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <span className="sr-only">{post.title}</span>
                    </div>
                    {post.image && (
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    )}
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
                                        title={`${file.name} 다운로드`}
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


