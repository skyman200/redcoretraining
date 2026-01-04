'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { useNewPost } from './hooks/useNewPost';
import { FileSection } from './components/FileSection';

export default function NewPostPage() {
    const router = useRouter();
    const {
        formData,
        isSubmitting,
        newFileName,
        newFileUrl,
        setNewFileName,
        setNewFileUrl,
        handleChange,
        handleFileUpload,
        handleAddFile,
        handleRemoveFile,
        handleSubmit
    } = useNewPost();

    useEffect(() => {
        // Check authentication
        const isAuth = sessionStorage.getItem('admin_auth');
        if (!isAuth) {
            router.push('/admin');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-black text-white py-6 px-6">
                <div className="container mx-auto">
                    <Link
                        href="/admin/dashboard"
                        className="inline-flex items-center gap-2 text-sm hover:text-gray-300 transition-colors mb-2"
                    >
                        <ArrowLeft size={16} />
                        대시보드로 돌아가기
                    </Link>
                    <h1 className="text-3xl font-bold">새 게시글 작성</h1>
                </div>
            </header>

            {/* Form */}
            <main className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold mb-2">제목 *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black transition-colors"
                                placeholder="게시글 제목 입력"
                                required
                            />
                        </div>

                        {/* Category & Date */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">카테고리 *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black transition-colors"
                                >
                                    <option value="Training">Training</option>
                                    <option value="Pilates">Pilates</option>
                                    <option value="Breathing">Breathing</option>
                                    <option value="Digital Health">Digital Health</option>
                                    <option value="Research">Research</option>
                                    <option value="Partner">Partner (파트너 전용)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">날짜 *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-bold mb-2">요약 *</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black transition-colors resize-none"
                                placeholder="게시글 요약 (목록에 표시됩니다)"
                                required
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-bold mb-2">내용 *</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={15}
                                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black transition-colors resize-none font-mono text-sm"
                                placeholder="게시글 내용 (마크다운 형식 지원)"
                                required
                            />
                        </div>

                        {/* Files Section */}
                        <FileSection
                            files={formData.files}
                            onRemove={handleRemoveFile}
                            onUploadComplete={handleFileUpload}
                            newFileName={newFileName}
                            setNewFileName={setNewFileName}
                            newFileUrl={newFileUrl}
                            setNewFileUrl={setNewFileUrl}
                            onAddManual={handleAddFile}
                        />

                        {/* Submit */}
                        <div className="flex gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-black text-white hover:bg-gray-800 transition-colors rounded font-bold uppercase tracking-wider disabled:opacity-50"
                            >
                                <Save size={20} />
                                {isSubmitting ? '저장 중...' : '게시글 저장'}
                            </button>
                            <Link
                                href="/admin/dashboard"
                                className="px-6 py-4 bg-gray-200 hover:bg-gray-300 transition-colors rounded font-bold uppercase tracking-wider"
                            >
                                취소
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
