import React from "react";

export default function GuideJa() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 text-zinc-300 leading-relaxed pb-20">
            {/* Header */}
            <div className="text-center space-y-4 border-b border-zinc-800 pb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">パートナー登録ガイド</h1>
                <p className="text-xl text-zinc-400">Redcoreトレーニングセンターのパートナーに参加するためのステップバイステップガイド。</p>
            </div>

            {/* Step 1 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">1</div>
                    <h2 className="text-2xl font-bold text-white">アカウント作成</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        パートナーセンターにアクセスし、[会員登録]または[Googleで続ける]からアカウントを作成してください。
                        <br />
                        すでにアカウントをお持ちの場合はログインしてください。
                    </p>
                </div>
            </section>

            {/* Step 2 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">2</div>
                    <h2 className="text-2xl font-bold text-white">申請と情報入力</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        ログイン後、<strong>[パートナー申請]</strong> ボタンをクリックしてください。
                        精算情報を正確に入力してください。
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-white">
                        <li><strong>地域選択:</strong> 日本を選択してください。</li>
                        <li><strong>基本情報:</strong> お名前と連絡先を入力してください。</li>
                        <li><strong>振込先情報:</strong> 20%のコミッションを受け取るための口座情報を入力してください。
                            <ul className="list-[circle] pl-5 mt-2 text-zinc-400 space-y-1">
                                <li>海外パートナーへの支払いは主に <strong>Wise</strong> を使用します。</li>
                                <li>Wiseを使用しない場合は、SWIFTコードと銀行口座情報を入力してください。</li>
                                <li className="text-red-400">注: $100未満の支払いは翌月に繰り越されます。</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Step 3 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">3</div>
                    <h2 className="text-2xl font-bold text-white">承認プロセス</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        申請ステータスは <strong>'Pending（審査中）'</strong> となります。
                        通常、1〜2営業日以内に審査を行います。
                    </p>
                    <p>
                        承認されると、パートナーダッシュボードに完全にアクセスできるようになります。
                    </p>
                </div>
            </section>

            {/* Step 4 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">4</div>
                    <h2 className="text-2xl font-bold text-white">収益化の開始</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        ダッシュボードの <strong>[パートナーリンクをコピー]</strong> をクリックしてください。
                    </p>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                        <h4 className="font-bold text-white">🚀 マーケティングのヒント</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>SNS、ブログ、YouTubeなどであなた専用のリンクを共有してください。</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>あなたのリンクから登録したユーザーの有料購読ごとに <strong>20%のコミッション</strong> を獲得できます。</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>ダッシュボードで売上と支払いをリアルタイムで確認できます。</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
