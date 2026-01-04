"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PartnerLoginForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, error, login, signup, googleSignIn } = useAuthActions();
    const { t } = useLanguage();
    const { login: lt } = t.partners;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            await login(email, password);
        } else {
            await signup(email, password);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-md"
        >
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tighter mb-2">
                    {isLogin ? lt.login : lt.signup}
                </h1>
                <p className="text-zinc-400 text-sm">
                    {lt.subtitle}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1 ml-1">{lt.email}</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                        placeholder="email@example.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1 ml-1">{lt.password}</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-xs mt-2 px-1">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-colors mt-4 disabled:opacity-50"
                >
                    {loading ? "..." : (isLogin ? lt.login : lt.signup)}
                </button>
            </form>

            <div className="mt-6 flex items-center justify-center space-x-4">
                <div className="h-px bg-zinc-800 flex-grow"></div>
                <span className="text-zinc-500 text-xs uppercase tracking-widest">{lt.google}</span>
                <div className="h-px bg-zinc-800 flex-grow"></div>
            </div>

            <button
                onClick={googleSignIn}
                disabled={loading}
                className="w-full bg-zinc-800/50 text-white font-medium py-3 rounded-xl hover:bg-zinc-800 transition-colors mt-6 flex items-center justify-center group disabled:opacity-50"
            >
                <svg className="w-5 h-5 mr-3 grayscale group-hover:grayscale-0 transition-all" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {lt.google}
            </button>

            <div className="mt-8 text-center text-sm text-zinc-500">
                {isLogin ? lt.noAccount : lt.hasAccount}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-white hover:underline font-medium"
                >
                    {isLogin ? lt.signup : lt.login}
                </button>
            </div>
        </motion.div>
    );
}
