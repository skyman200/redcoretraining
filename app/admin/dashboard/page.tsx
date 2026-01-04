'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, FileText, LogOut, Trash2 } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    content: string;
    image: string;
    files?: Array<{ name: string; url: string }>;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    useEffect(() => {
        // Check authentication
        const isAuth = sessionStorage.getItem('admin_auth');
        if (!isAuth) {
            router.push('/admin');
            return;
        }

        // Load posts from localStorage
        const savedPosts = localStorage.getItem('admin_posts');
        setTimeout(() => {
            if (savedPosts) {
                setPosts(JSON.parse(savedPosts));
            }
            setLoading(false);
        }, 0);
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem('admin_auth');
        router.push('/admin');
    };

    const handleDeleteClick = (id: string) => {
        setPostToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (postToDelete) {
            // Find the post to get its files
            const post = posts.find(p => p.id === postToDelete);

            // Delete associated files from Cloudinary
            if (post && post.files && post.files.length > 0) {
                for (const file of post.files) {
                    if (file.id) {
                        try {
                            await fetch('/api/delete-file', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    public_id: file.id,
                                    resource_type: file.resourceType || 'image' // Default to image if missing
                                }),
                            });
                            console.log(`Deleted file: ${file.name}`);
                        } catch (err) {
                            console.error(`Failed to delete file ${file.name}:`, err);
                        }
                    }
                }
            }

            const updatedPosts = posts.filter(p => p.id !== postToDelete);
            setPosts(updatedPosts);
            localStorage.setItem('admin_posts', JSON.stringify(updatedPosts));
            setShowDeleteModal(false);
            setPostToDelete(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-2xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-black text-white py-6 px-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/partners"
                            className="px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors rounded text-sm font-medium"
                        >
                            파트너 관리
                        </Link>
                        <Link
                            href="/"
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded text-sm font-medium"
                        >
                            홈페이지 보기
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors rounded text-sm font-medium"
                        >
                            <LogOut size={16} />
                            로그아웃
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">게시글 관리</h2>
                    <Link
                        href="/admin/new-post"
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded font-medium"
                    >
                        <Plus size={20} />
                        새 게시글 작성
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-300"
                    >
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-600 mb-4">게시글이 없습니다</p>
                        <Link
                            href="/admin/new-post"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded font-medium"
                        >
                            <Plus size={20} />
                            첫 게시글 작성하기
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid gap-4">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                        <p className="text-gray-600 mb-2 line-clamp-2">{post.excerpt}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="px-2 py-1 bg-gray-100 rounded">{post.category}</span>
                                            <span>{post.date}</span>
                                            {post.files && post.files.length > 0 && (
                                                <span>📎 {post.files.length}개 파일</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Link
                                            href={`/board/${post.id}`}
                                            className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-colors"
                                            title="보기"
                                        >
                                            <FileText size={20} />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClick(post.id)}
                                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                            title="삭제"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
                    >
                        <h3 className="text-xl font-bold mb-4">게시글 삭제</h3>
                        <p className="text-gray-600 mb-6">
                            정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                            >
                                취소
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-medium"
                            >
                                삭제하기
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
