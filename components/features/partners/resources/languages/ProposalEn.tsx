import React from "react";

export default function ProposalEn() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 text-zinc-300 leading-relaxed pb-20">
            {/* Title Section */}
            <div className="text-center space-y-6 border-b border-zinc-800 pb-16">
                <span className="text-red-500 font-bold tracking-widest text-sm uppercase">Partnership Proposal</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                    Innovate the Future of<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Digital Healthcare</span><br />
                    with Redcore.
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto pt-4">
                    Data-driven rehabilitation solutions. Now, it's your opportunity to monetize your network.
                </p>
            </div>

            {/* Vision Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">Why Redcore?</h2>
                    <p className="text-lg">
                        Since 2016, Redcore Training Center has accumulated <strong>tens of thousands of clinical data points</strong>.
                        We provide <strong>scientific rehabilitation solutions</strong> designed by physical therapy specialists, not just a simple workout app.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Proven DNS (Dynamic Neuromuscular Stabilization) programs</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Evidenced by real recovery cases</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Globally scalable mobile platform</span>
                        </li>
                    </ul>
                    <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 mt-4">
                        <h4 className="font-bold text-white mb-2">✨ Free Trial Benefit</h4>
                        <p className="text-sm text-zinc-300">
                            Everyone gets a <strong>7-day free trial</strong> upon downloading the app.<br />
                            We also provide <strong>1-month free promo codes</strong> upon partner request for marketing purposes.
                        </p>
                    </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 h-full flex flex-col justify-center">
                    <div className="text-center space-y-2">
                        <div className="text-5xl font-bold text-white">20%</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-widest">Revenue Share</div>
                        <p className="pt-4 text-zinc-400">
                            Industry-leading commission rate.<br />
                            Earn as much as your influence.
                        </p>
                    </div>
                </div>
            </section>

            {/* Revenue Model */}
            <section className="space-y-8 bg-zinc-900/30 rounded-3xl p-8 md:p-12 border border-zinc-800">
                <h2 className="text-3xl font-bold text-white text-center">Revenue Model</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-2xl">🔗</div>
                        <h3 className="text-xl font-bold text-white">1. Link & Share</h3>
                        <p className="text-sm">Get your unique partner link and share it on your blog, social media, or YouTube.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-2xl">👥</div>
                        <h3 className="text-xl font-bold text-white">2. User Sign-up</h3>
                        <p className="text-sm">Users sign up through your link and start a paid subscription.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">$</div>
                        <h3 className="text-xl font-bold text-white">3. Get Paid</h3>
                        <p className="text-sm">20% of the payment amount is settled to your account monthly.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center space-y-6 pt-12">
                <h2 className="text-3xl font-bold text-white">Start Now</h2>
                <p className="text-zinc-400">
                    Registration is free and you can start anytime.<br />
                    We are waiting for partners to grow with Redcore.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="/partners/board" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors">
                        Apply as Partner
                    </a>
                </div>
            </div>
        </div>
    );
}
