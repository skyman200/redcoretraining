import React from "react";

export default function ProposalJa() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 text-zinc-300 leading-relaxed pb-20">
            {/* Title Section */}
            <div className="text-center space-y-6 border-b border-zinc-800 pb-16">
                <span className="text-red-500 font-bold tracking-widest text-sm uppercase">Partnership Proposal</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                    Redcoreと共に<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">デジタルヘルスケアの未来</span>を<br />
                    革新しましょう。
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto pt-4">
                    データ駆動型リハビリソリューション。あなたのネットワークで収益を生み出すチャンスです。
                </p>
            </div>

            {/* Vision Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">Why Redcore?</h2>
                    <p className="text-lg">
                        2016年以来、Redcoreトレーニングセンターは<strong>数万件の臨床データ</strong>を蓄積してきました。
                        単なる運動アプリではなく、理学療法士の専門家が設計した<strong>科学的なリハビリソリューション</strong>を提供します。
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>検証されたSOOM BREATHINGアプリケーション</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>実際の回復事例で証明されたデータ</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>グローバルな拡張性を備えたモバイルプラットフォーム</span>
                        </li>
                    </ul>
                    <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 mt-4">
                        <h4 className="font-bold text-white mb-2">✨ 無料体験特典</h4>
                        <p className="text-sm text-zinc-300">
                            アプリインストールで誰でも<strong>7日間無料体験</strong>が可能です。<br />
                            パートナーのリクエストに応じて、マーケティング用の<strong>1ヶ月無料プロモーションコード</strong>も提供します。
                        </p>
                    </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 h-full flex flex-col justify-center">
                    <div className="text-center space-y-2">
                        <div className="text-5xl font-bold text-white">20%</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-widest">Revenue Share</div>
                        <p className="pt-4 text-zinc-400">
                            業界最高水准のコミッション率。<br />
                            あなたの影響力の分だけ収益を得られます。
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
                        <p className="text-sm">独自のパートナーリンクを取得し、ブログ、SNS、YouTubeで共有します。</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-2xl">👥</div>
                        <h3 className="text-xl font-bold text-white">2. User Sign-up</h3>
                        <p className="text-sm">ユーザーがリンク経由で登録し、有料購読を開始します。</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">$</div>
                        <h3 className="text-xl font-bold text-white">3. Get Paid</h3>
                        <p className="text-sm">決済金額の20%が毎月あなたの口座に支払われます。<br /><span className="text-zinc-500 text-xs">（海外送金の場合、100ドル未満は翌月に繰り越されます。）</span></p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center space-y-6 pt-12">
                <h2 className="text-3xl font-bold text-white">今すぐ始める</h2>
                <p className="text-zinc-400">
                    登録は無料で、いつでも開始できます。<br />
                    Redcoreと共に成長するパートナーをお待ちしています。
                </p>
                <div className="flex justify-center gap-4">
                    <a href="/partners/board" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors">
                        パートナー申請
                    </a>
                </div>
            </div>
        </div>
    );
}
