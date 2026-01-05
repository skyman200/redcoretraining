import React from "react";

export default function ProposalKo() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 text-zinc-300 leading-relaxed pb-20">
            {/* Title Section */}
            <div className="text-center space-y-6 border-b border-zinc-800 pb-16">
                <span className="text-red-500 font-bold tracking-widest text-sm uppercase">Partnership Proposal</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                    Redcore와 함께<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">디지털 헬스케어의 미래</span>를<br />
                    만드십시오.
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto pt-4">
                    데이터 기반의 재활 운동 솔루션, 이제 당신의 네트워크에서 수익을 창출할 기회입니다.
                </p>
            </div>

            {/* Vision Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">Why Redcore?</h2>
                    <p className="text-lg">
                        레드코어 트레이닝 센터는 2016년부터 축적된 <strong>수만 건의 임상 데이터</strong>를 보유하고 있습니다.
                        단순한 운동 앱이 아닌, 물리치료사 출신 전문가들이 설계한 <strong>과학적인 재활 솔루션</strong>을 제공합니다.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>검증된 SOOM BREATHING 애플리케이션</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>실제 회복 사례로 증명된 데이터</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>글로벌 확장성을 갖춘 모바일 플랫폼</span>
                        </li>
                    </ul>
                    <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 mt-4">
                        <h4 className="font-bold text-white mb-2">✨ 무료 체험 혜택</h4>
                        <p className="text-sm text-zinc-300">
                            앱 설치 시 누구나 <strong>7일간 무료로 체험</strong>해 볼 수 있습니다.<br />
                            파트너 요청 시 마케팅 활용을 위한 <strong>1개월 무료 프로모션 코드</strong>도 지원해 드립니다.
                        </p>
                    </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 h-full flex flex-col justify-center">
                    <div className="text-center space-y-2">
                        <div className="text-5xl font-bold text-white">20%</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-widest">Revenue Share</div>
                        <p className="pt-4 text-zinc-400">
                            업계 최고 수준의 수익 배분율.<br />
                            당신의 영향력만큼 수익을 가져가세요.
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
                        <p className="text-sm">고유 파트너 링크를 발급받아 블로그, SNS, 유튜브에 공유합니다.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-2xl">👥</div>
                        <h3 className="text-xl font-bold text-white">2. User Sign-up</h3>
                        <p className="text-sm">사용자가 링크를 통해 가입하고 유료 구독을 시작합니다.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">$</div>
                        <h3 className="text-xl font-bold text-white">3. Get Paid</h3>
                        <p className="text-sm">결제 금액의 20%가 매월 당신의 계좌로 정산됩니다.<br /><span className="text-zinc-500 text-xs">(해외 송금의 경우 $100 미만은 이월됩니다.)</span></p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center space-y-6 pt-12">
                <h2 className="text-3xl font-bold text-white">지금 바로 시작하세요</h2>
                <p className="text-zinc-400">
                    파트너 등록은 무료이며, 언제든지 시작할 수 있습니다.<br />
                    레드코어의 성장을 함께할 파트너를 기다립니다.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="/partners/board" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors">
                        파트너 신청하기
                    </a>
                </div>
            </div>
        </div>
    );
}
