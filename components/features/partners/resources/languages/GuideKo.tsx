import React from "react";

export default function GuideKo() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 text-zinc-300 leading-relaxed pb-20">
            {/* Header */}
            <div className="text-center space-y-4 border-b border-zinc-800 pb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">파트너 등록 가이드</h1>
                <p className="text-xl text-zinc-400">레드코어와 함께 성장하는 첫 걸음, 파트너십 등록 방법을 안내해 드립니다.</p>
            </div>

            {/* Step 1 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">1</div>
                    <h2 className="text-2xl font-bold text-white">파트너 계정 생성</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        파트너 전용 페이지에 접속하여 [회원가입] 또는 [Google로 시작하기]를 통해 계정을 생성해 주세요.
                        <br />
                        이미 계정이 있다면 로그인해 주세요.
                    </p>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <h4 className="font-bold text-white mb-2">💡 팁</h4>
                        <p className="text-sm">구글 계정을 사용하시면 별도의 비밀번호 설정 없이 간편하게 로그인하실 수 있습니다.</p>
                    </div>
                </div>
            </section>

            {/* Step 2 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">2</div>
                    <h2 className="text-2xl font-bold text-white">파트너 신청 및 정보 입력</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        로그인 후, 화면 중앙의 <strong>[파트너 신청하기]</strong> 버튼을 클릭하세요.
                        정산에 필요한 정보를 정확하게 입력해야 합니다.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-white">
                        <li><strong>지역 선택:</strong> 거주 국가 또는 언어권에 맞는 지역을 선택하세요. (내국인은 'Korea' 선택)</li>
                        <li><strong>기본 정보:</strong> 성함과 연락처를 입력합니다.</li>
                        <li><strong>정산 정보 (중요):</strong> 수익금을 지급받을 본인 명의의 계좌 정보를 입력합니다.
                            <ul className="list-[circle] pl-5 mt-2 text-zinc-400 space-y-1">
                                <li>내국인: 은행명, 계좌번호, 주민등록번호(원천징수 신고용)</li>
                                <li>해외: Wise 이메일 또는 은행 계좌 정보 (SWIFT 코드 등)</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Step 3 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">3</div>
                    <h2 className="text-2xl font-bold text-white">승인 대기 및 결과 확인</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        신청이 완료되면 <strong>'심사 중 (Pending)'</strong> 상태가 됩니다.
                        관리자가 내용을 검토한 후 승인 처리를 진행하며, 승인이 완료되면 이메일로 알림이 발송될 수 있습니다.
                    </p>
                    <p>
                        승인이 완료되면 대시보드에 접근할 수 있습니다.
                    </p>
                </div>
            </section>

            {/* Step 4 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">4</div>
                    <h2 className="text-2xl font-bold text-white">파트너 링크 발급 및 활동 시작</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        대시보드 상단에 있는 <strong>[파트너 링크 복사]</strong> 버튼을 클릭하여 고유 링크를 복사하세요.
                    </p>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                        <h4 className="font-bold text-white">🚀 활동 가이드</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>블로그, SNS, 유튜브 등에 레드코어 앱을 소개하고 링크를 첨부합니다.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>이 링크를 통해 유입된 사용자가 유료 회원이 되면, 결제 금액의 20%가 자동으로 커미션으로 적립됩니다.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>대시보드에서 실시간으로 유입 및 매출 현황을 확인할 수 있습니다.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
