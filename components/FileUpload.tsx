'use client';

import { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadedFile {
    id: string;
    name: string;
    url: string;
    viewLink: string;
    downloadLink: string;
    resourceType?: string;
}

interface FileUploadProps {
    onUploadComplete: (file: UploadedFile) => void;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleUpload(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleUpload(e.target.files[0]);
        }
    };

    const handleUpload = async (file: File) => {
        // Cloudinary free tier limit is usually 10MB for raw files, but images/videos can be larger.
        // We'll keep a safe limit or rely on Cloudinary's error.
        if (file.size > 100 * 1024 * 1024) { // 100MB limit
            setError('File size exceeds 100MB limit');
            return;
        }

        setIsUploading(true);
        setError(null);
        setUploadProgress(0);

        try {
            // 1. Get signature from server
            const timestamp = Math.round((new Date()).getTime() / 1000);
            const paramsToSign = `folder=board_files&timestamp=${timestamp}`; // Parameters to sign, sorted alphabetically

            const signResponse = await fetch('/api/sign-upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paramsToSign })
            });

            if (!signResponse.ok) {
                throw new Error('Failed to get upload signature');
            }

            const { signature, apiKey, cloudName } = await signResponse.json();

            // 2. Upload to Cloudinary
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', apiKey);
            formData.append('timestamp', timestamp.toString());
            formData.append('signature', signature);
            formData.append('folder', 'board_files');
            // Explicitly set access_mode to public if needed, but signed uploads are public by default unless specified otherwise
            // formData.append('access_mode', 'public'); 

            const xhr = new XMLHttpRequest();

            const promise = new Promise<UploadedFile>((resolve, reject) => {
                xhr.upload.addEventListener('progress', (event) => {
                    if (event.lengthComputable) {
                        const progress = Math.round((event.loaded / event.total) * 100);
                        setUploadProgress(progress);
                    }
                });

                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const response = JSON.parse(xhr.responseText);
                        // Map Cloudinary response to UploadedFile interface
                        const uploadedFile: UploadedFile = {
                            id: response.public_id,
                            name: file.name,
                            url: response.secure_url,
                            viewLink: response.secure_url,
                            downloadLink: response.secure_url,
                            resourceType: response.resource_type // Capture resource_type (image, raw, video)
                        };
                        resolve(uploadedFile);
                    } else {
                        console.error('Cloudinary upload failed:', xhr.responseText);
                        reject(new Error('Upload failed'));
                    }
                });

                xhr.addEventListener('error', () => reject(new Error('Network error')));
                xhr.open('POST', url);
                xhr.send(formData);
            });

            const uploadedFile = await promise;
            onUploadComplete(uploadedFile);
            setIsUploading(false);
            setUploadProgress(100);

            // Reset after success
            setTimeout(() => {
                setUploadProgress(0);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }, 2000);

        } catch (err) {
            console.error('Upload error:', err);
            setError(err instanceof Error ? err.message : 'Failed to upload file');
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full">
            <div
                className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${isDragging
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-red-400'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    // Accept common file types
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.mp4,.mov"
                />

                <div className="flex flex-col items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                        {isUploading ? (
                            <motion.div
                                key="uploading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative w-16 h-16 mb-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r="28"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                            className="text-gray-200"
                                        />
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r="28"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                            strokeDasharray={175.93}
                                            strokeDashoffset={175.93 - (175.93 * uploadProgress) / 100}
                                            className="text-red-600 transition-all duration-300"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                        {uploadProgress}%
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Uploading to Cloudinary...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-500">
                                    <Upload size={24} />
                                </div>
                                <p className="text-lg font-medium mb-1">
                                    Drop files here or <span role="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); fileInputRef.current?.click(); }} className="text-red-600 hover:underline font-bold cursor-pointer">browse</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Supports PDF, Images, Zip, Video (Max 100MB)
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm"
                >
                    <X size={16} />
                    {error}
                </motion.div>
            )}
        </div>
    );
}
