import React from "react";

export default function GuideEn() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 text-zinc-300 leading-relaxed pb-20">
            {/* Header */}
            <div className="text-center space-y-4 border-b border-zinc-800 pb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Partner Registration Guide</h1>
                <p className="text-xl text-zinc-400">Step-by-step instructions to join Redcore Training Center as a partner.</p>
            </div>

            {/* Step 1 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">1</div>
                    <h2 className="text-2xl font-bold text-white">Create Account</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        Visit the Partner Center and create an account via [Sign Up] or [Continue with Google].
                        <br />
                        If you already have an account, please log in.
                    </p>
                </div>
            </section>

            {/* Step 2 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">2</div>
                    <h2 className="text-2xl font-bold text-white">Apply & Submit Info</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        After logging in, click the <strong>[Apply as Partner]</strong> button.
                        Please ensure all settlement information is accurate.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-white">
                        <li><strong>Select Region:</strong> Choose your residence country or language region.</li>
                        <li><strong>Basic Info:</strong> Enter your full name and contact information.</li>
                        <li><strong>Payout Info:</strong> Provide account details to receive your 20% commission.
                            <ul className="list-[circle] pl-5 mt-2 text-zinc-400 space-y-1">
                                <li>International partners accept payouts primarily via <strong>Wise</strong>.</li>
                                <li>If you don't use Wise, please provide your SWIFT code and bank details.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Step 3 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">3</div>
                    <h2 className="text-2xl font-bold text-white">Approval Process</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        Your application status will be <strong>'Pending'</strong>.
                        We typically review applications within 1-2 business days.
                    </p>
                    <p>
                        Once approved, you will gain full access to the Partner Dashboard.
                    </p>
                </div>
            </section>

            {/* Step 4 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">4</div>
                    <h2 className="text-2xl font-bold text-white">Start Earning</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        Click <strong>[Copy Partner Link]</strong> on your dashboard.
                    </p>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                        <h4 className="font-bold text-white">🚀 Marketing Tips</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>Share your unique link on social media, blogs, or YouTube.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>Earn <strong>20% commission</strong> on every paid subscription from users who sign up via your link.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>Track your sales and payouts in real-time on the dashboard.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
