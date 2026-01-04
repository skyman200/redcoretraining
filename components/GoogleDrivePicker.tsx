'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Loader2, Check } from 'lucide-react';

interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
    webViewLink: string;
    webContentLink?: string;
    size?: string;
    modifiedTime: string;
}

interface GoogleDrivePickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (file: { name: string; url: string; id: string; mimeType: string }) => void;
}

export default function GoogleDrivePicker({ isOpen, onClose, onSelect }: GoogleDrivePickerProps) {
    const [files, setFiles] = useState<DriveFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchFiles();
        }
    }, [isOpen]);

    const fetchFiles = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/drive');
            if (!response.ok) {
                throw new Error('Failed to fetch files from Google Drive');
            }
            const data = await response.json();
            setFiles(data);
        } catch (err) {
            console.error('Error fetching drive files:', err);
            setError('Failed to load files. Please check your Google Drive configuration.');
        } finally {
            setLoading(false);
        }
    };

    const formatSize = (bytes?: string) => {
        if (!bytes) return '-';
        const size = parseInt(bytes);
        if (size < 1024) return size + ' B';
        if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
        return (size / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                                <h2 className="text-xl font-bold">Google Drive 파일 선택</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                        <Loader2 size={32} className="animate-spin mb-4" />
                                        <p>파일 목록을 불러오는 중...</p>
                                    </div>
                                ) : error ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-red-500">
                                        <p className="font-medium mb-2">오류가 발생했습니다</p>
                                        <p className="text-sm">{error}</p>
                                        <button
                                            onClick={fetchFiles}
                                            className="mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                        >
                                            다시 시도
                                        </button>
                                    </div>
                                ) : files.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                        <FileText size={48} className="mb-4 text-gray-300" />
                                        <p>표시할 파일이 없습니다.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-3">
                                        {files.map((file) => (
                                            <button
                                                key={file.id}
                                                onClick={() => {
                                                    // Use webContentLink for direct download if available, otherwise webViewLink
                                                    const url = file.webContentLink || file.webViewLink;
                                                    onSelect({
                                                        name: file.name,
                                                        url: url,
                                                        id: file.id,
                                                        mimeType: file.mimeType
                                                    });
                                                    onClose();
                                                }}
                                                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-black hover:shadow-md transition-all text-left group"
                                            >
                                                <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                                                    <FileText size={24} className="text-gray-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium truncate mb-1">{file.name}</h3>
                                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                                        <span>{formatSize(file.size)}</span>
                                                        <span>•</span>
                                                        <span>{formatDate(file.modifiedTime)}</span>
                                                    </div>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-black">
                                                    <Check size={20} />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
