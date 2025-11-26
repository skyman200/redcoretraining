'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send } from 'lucide-react';

function ContactPage() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate form submission
        try {
            // In a real app, this would send to an API endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });

            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent('양산시 물금읍 증산역로 163 6층 레드코어운동센터');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-white text-black"
        >
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                            <span className="bg-gradient-to-r from-black via-red-600 to-black bg-clip-text text-transparent">
                                {t.contact.hero.title}
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {t.contact.hero.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-8">{t.contact.form.title}</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                                        {t.contact.form.name}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-red-600 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                                        {t.contact.form.email}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-red-600 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                                        {t.contact.form.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-red-600 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                                        {t.contact.form.message}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-red-600 transition-colors resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Send size={20} />
                                    {t.contact.form.submit}
                                </button>

                                {status === 'success' && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-green-600 font-medium text-center"
                                    >
                                        {t.contact.form.success}
                                    </motion.p>
                                )}

                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-600 font-medium text-center"
                                    >
                                        {t.contact.form.error}
                                    </motion.p>
                                )}
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-bold mb-8">{t.contact.info.title}</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-bold mb-1">Address</p>
                                        <a
                                            href={googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-700 hover:text-red-600 transition-colors"
                                        >
                                            {t.contact.info.address}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-bold mb-1">Email</p>
                                        <a
                                            href="mailto:admin@redcoretraining.com"
                                            className="text-gray-700 hover:text-red-600 transition-colors"
                                        >
                                            admin@redcoretraining.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-bold mb-1">{t.contact.info.hours}</p>
                                        <p className="text-gray-700">{t.contact.info.hoursDetail}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps Embed */}
                            <div className="mt-8 border-2 border-black">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.5!2d129.0!3d35.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDI0JzAwLjAiTiAxMjnCsDAwJzAwLjAiRQ!5e0!3m2!1senlseen!2skr!4v1234567890!5m2!1sen!2skr"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Redcore Training Center Location"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </motion.div>
    );
}

export default ContactPage;
