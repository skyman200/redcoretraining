'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simple password check (in production, use proper authentication)
        if (password === 'redcore2016') {
            // Store auth in sessionStorage
            sessionStorage.setItem('admin_auth', 'true');
            router.push('/admin/dashboard');
        } else {
            setError('비밀번호가 올바르지 않습니다.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Admin Login</h1>
                    <p className="text-gray-400">레드코어 관리자 로그인</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wide">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                            placeholder="관리자 비밀번호 입력"
                            required
                        />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm font-medium"
                        >
                            {error}
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-4 font-bold uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? '로그인 중...' : 'Login'}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-8">
                    Default password: redcore2016
                </p>
            </motion.div>
        </div>
    );
}
