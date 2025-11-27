'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import FileUpload from '@/components/FileUpload';



export default function NewPostPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Training',
        date: new Date().toISOString().split('T')[0]
    });
    const [files, setFiles] = useState<Array<{ name: string; url: string }>>([]);
    const [newFileName, setNewFileName] = useState('');
    const [newFileUrl, setNewFileUrl] = useState('');

    useEffect(() => {
        // Check authentication
        const isAuth = sessionStorage.getItem('admin_auth');
        if (!isAuth) {
            router.push('/admin');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleAddFile = () => {
        if (newFileName && newFileUrl) {
            setFiles(prev => [...prev, { name: newFileName, url: newFileUrl }]);
            setNewFileName('');
            setNewFileUrl('');
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create new post
        const newPost = {
            id: formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-가-힣]/g, ''),
            ...formData,
            files,
            image: '/hero.jpg' // Default image
        };

        // Save to localStorage
        const savedPosts = localStorage.getItem('admin_posts');
        const posts = savedPosts ? JSON.parse(savedPosts) : [];
        posts.unshift(newPost);
        localStorage.setItem('admin_posts', JSON.stringify(posts));

        // Redirect to dashboard
        router.push('/admin/dashboard');
    };

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

                        {/* Files */}
                        <div>
                            <label className="block text-sm font-bold mb-4">첨부 파일</label>

                            {/* Existing files */}
                            {files.length > 0 && (
                                <div className="space-y-2 mb-4">
                                    {files.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="bg-gray-200 p-2 rounded">
                                                    <Save size={16} className="text-gray-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-medium truncate">{file.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">Google Drive</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(index)}
                                                className="text-red-600 hover:text-red-700 p-1"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add new file */}
                            <div className="space-y-4">
                                {/* File Upload */}
                                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-black transition-colors">
                                    <p className="font-medium mb-4 text-gray-700 text-center">파일 업로드</p>
                                    <FileUpload
                                        onUploadComplete={(file) => {
                                            setFiles(prev => [...prev, {
                                                name: file.name,
                                                url: file.downloadLink
                                            }]);
                                        }}
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">또는 링크 직접 입력</span>
                                    </div>
                                </div>

                                {/* Manual URL Input */}
                                <div className="p-4 bg-gray-50 rounded border border-gray-200 space-y-3">
                                    <input
                                        type="text"
                                        value={newFileName}
                                        onChange={(e) => setNewFileName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black transition-colors bg-white"
                                        placeholder="파일 이름 (예: pilates-guide.pdf)"
                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newFileUrl}
                                            onChange={(e) => setNewFileUrl(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black transition-colors bg-white"
                                            placeholder="파일 URL (Google Drive 링크 등)"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddFile}
                                            disabled={!newFileName || !newFileUrl}
                                            className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded whitespace-nowrap"
                                        >
                                            추가
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex gap-4 pt-6">
                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-black text-white hover:bg-gray-800 transition-colors rounded font-bold uppercase tracking-wider"
                            >
                                <Save size={20} />
                                게시글 저장
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
