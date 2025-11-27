'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Check, Loader2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Type declaration for Google Identity Services
declare global {
    interface Window {
        google: any;
    }
}

interface UploadedFile {
    id: string;
    name: string;
    url: string;
    viewLink: string;
    downloadLink: string;
}

interface FileUploadProps {
    onUploadComplete: (file: UploadedFile) => void;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isAuthorizing, setIsAuthorizing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const tokenClientRef = useRef<any>(null);

    // Initialize Google Identity Services
    useEffect(() => {
        // Load stored token
        const storedToken = localStorage.getItem('google_drive_token');
        if (storedToken) {
            const { access_token, expiry_date } = JSON.parse(storedToken);
            if (Date.now() < expiry_date) {
                setAccessToken(access_token);
            } else {
                localStorage.removeItem('google_drive_token');
            }
        }

        // Initialize GIS token client
        if (typeof window !== 'undefined' && window.google) {
            tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
                client_id: '831055186990-70g8l73pnof7th8fd0dnvbk7ugvbbc8b.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/drive.file',
                callback: (response: any) => {
                    if (response.access_token) {
                        const expiryDate = Date.now() + (response.expires_in * 1000);
                        localStorage.setItem('google_drive_token', JSON.stringify({
                            access_token: response.access_token,
                            expiry_date: expiryDate,
                        }));
                        setAccessToken(response.access_token);
                        setIsAuthorizing(false);
                    }
                },
            });
        }
    }, []);

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

    const handleAuthorize = () => {
        if (tokenClientRef.current) {
            setIsAuthorizing(true);
            setError(null);
            tokenClientRef.current.requestAccessToken();
        } else {
            setError('Google Identity Services not loaded. Please refresh the page.');
        }
    };

    const handleUpload = async (file: File) => {
        // Check for authorization first
        if (!accessToken) {
            setError('Please authorize with Google Drive first');
            handleAuthorize();
            return;
        }

        if (file.size > 300 * 1024 * 1024) {
            setError('File size exceeds 300MB limit');
            return;
        }

        setIsUploading(true);
        setError(null);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('access_token', accessToken);

        try {
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
                        if (response.success) {
                            resolve(response.file);
                        } else {
                            reject(new Error(response.error || 'Upload failed'));
                        }
                    } else {
                        reject(new Error('Upload failed'));
                    }
                });

                xhr.addEventListener('error', () => reject(new Error('Network error')));
                xhr.open('POST', '/api/upload');
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
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                />

                <div className="flex flex-col items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                        {!accessToken && !isAuthorizing ? (
                            <motion.div
                                key="authorize"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                                    </svg>
                                </div>
                                <p className="text-lg font-medium mb-2">Connect to Google Drive</p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Authorize once to upload files to your Drive
                                </p>
                                <button
                                    onClick={handleAuthorize}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Authorize with Google
                                </button>
                            </motion.div>
                        ) : isAuthorizing ? (
                            <motion.div
                                key="authorizing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Authorizing with Google...</p>
                            </motion.div>
                        ) : isUploading ? (
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
                                <p className="text-sm font-medium text-gray-600">Uploading to Drive...</p>
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
                                    Drop files here or <button onClick={() => fileInputRef.current?.click()} className="text-red-600 hover:underline font-bold">browse</button>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Supports PDF, Images, Zip (Max 300MB)
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
