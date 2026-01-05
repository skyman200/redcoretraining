"use client";

import React from "react";
import { LanguageRegion } from "@/lib/partnerConstants";

interface AgreementTextInternationalProps {
    languageRegion: LanguageRegion;
}

export default function AgreementTextInternational({ languageRegion }: AgreementTextInternationalProps) {
    const Content = AGREEMENT_COMPONENTS[languageRegion] || AGREEMENT_COMPONENTS.en;
    return (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 h-80 overflow-y-auto text-sm text-zinc-400 leading-relaxed scrollbar-hide text-justify font-light">
            <Content />
        </div>
    );
}

// ============================================
// Agreement Components by Language
// ============================================

function EnglishAgreement() {
    return (
        <>
            <h3 className="text-white font-bold mb-4 text-base tracking-wide border-b border-zinc-800 pb-2">
                Redcore Training Center - Partnership Agreement
            </h3>
            <div className="space-y-6">
                <Article title="Article 1 (Purpose)">
                    <p>The purpose of this Agreement is to regulate the rights and obligations concerning app marketing partnership activities and revenue settlement between <strong>Redcore Training Center</strong> (hereinafter referred to as the "Center") and the Partner.</p>
                </Article>

                <Article title="Article 2 (Revenue Share & Taxes)">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Referral Tracking:</strong> The Center issues a unique 'Referral Link' to the Partner. Performance is recognized only when a user accesses the service through this link, completes membership registration, and proceeds with a paid subscription.</li>
                        <li><strong>Commission Rate:</strong> For subscriptions meeting these conditions, <strong className="text-white">20% of the payment amount</strong> will be calculated as the Partner's revenue.</li>
                        <li><strong>Taxation:</strong> The final payout amount will be determined after deducting any applicable withholding taxes required by the tax laws of the Republic of Korea or the Partner's country of residence.</li>
                    </ol>
                </Article>

                <Article title="Article 3 (Settlement and Payment)">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Payment Schedule:</strong> Settlement is processed monthly. Revenue confirmed from the 1st to the last day of each month will be paid on the <strong className="text-white">10th of the following month</strong>. (If the 10th is a weekend or holiday, payment will be made on the next business day.)</li>
                        <li><strong>Minimum Payout Threshold (USD 100):</strong> To optimize international transaction costs, payouts will only be processed when the cumulative unpaid revenue reaches or exceeds <strong className="text-white">USD 100</strong>. If less, it automatically rolls over to the next month.</li>
                        <li>
                            <strong>Payment Method (Wise & Alternatives):</strong>
                            <ul className="list-disc pl-5 mt-1 text-zinc-500">
                                <li>The primary payment method is <strong>Wise</strong> (formerly TransferWise). Payments are sent in USD or the Partner's local currency.</li>
                                <li><strong className="text-amber-400">Exception Clause:</strong> If the Partner cannot receive funds via Wise, or due to the Center's internal circumstances, the Center reserves the right to change the remittance method (e.g., SWIFT wire, PayPal). In such cases, additional transaction fees may apply and will be deducted from the payout.</li>
                            </ul>
                        </li>
                        <li><strong>Fees & Exchange Rate:</strong> Transaction fees are deducted from the payout amount. The exchange rate follows the real-time rate provided by the remittance service at the time of transfer.</li>
                    </ol>
                </Article>

                <Article title="Article 4 (Termination & Forfeiture)">
                    <p>Partners may terminate this agreement at any time. Upon voluntary termination, if the remaining balance is <strong className="text-white">below the Minimum Payout Threshold (USD 100)</strong>, the balance will be forfeited and will not be paid out due to administrative and transaction costs.</p>
                </Article>
            </div>
        </>
    );
}

function JapaneseAgreement() {
    return (
        <>
            <h3 className="text-white font-bold mb-4 text-base tracking-wide border-b border-zinc-800 pb-2">
                Redcore Training Center - パートナーシップ契約書
            </h3>
            <div className="space-y-6">
                <Article title="第1条 (目的)">
                    <p>本契約は、<strong>Redcore Training Center</strong>（以下「当センター」）とパートナーとの間における、アプリマーケティング活動および収益精算に関する権利義務を定めることを目的とします。</p>
                </Article>

                <Article title="第2条 (収益配分および税金)">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>成果トラッキング:</strong> 当センターはパートナーに固有の「紹介リンク」を発行します。ユーザーがこのリンクを通じてサービスにアクセスし、会員登録および有料購読を行った場合にのみ成果として認められます。</li>
                        <li><strong>コミッション率:</strong> 条件を満たした購読に対し、<strong className="text-white">決済金額の20%</strong>をパートナーの収益として算出します。</li>
                        <li><strong>税金:</strong> 最終的な支払額は、大韓民国またはパートナーの居住国の税法に基づき、必要な源泉徴収税を控除した後に決定されます。</li>
                    </ol>
                </Article>

                <Article title="第3条 (精算および支払)">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>支払スケジュール:</strong> 精算は毎月行われます。毎月1日から末日までに確定した収益は、<strong className="text-white">翌月10日</strong>に支払われます（10日が週末または祝日の場合は翌営業日）。</li>
                        <li><strong>最低支払基準額 (100米ドル):</strong> 国際送金コストを最適化するため、未払い収益の累計が<strong className="text-white">100 USD</strong>以上に達した場合にのみ支払われます。100 USD未満の場合は翌月に自動的に繰り越されます。</li>
                        <li>
                            <strong>支払方法 (Wiseおよび代替手段):</strong>
                            <ul className="list-disc pl-5 mt-1 text-zinc-500">
                                <li>基本の送金方法は <strong>Wise</strong> (旧TransferWise) です。原則としてUSDまたは現地通貨で送金されます。</li>
                                <li><strong className="text-amber-400">例外条項:</strong> パートナーがWiseで受け取り不可能な場合、または当センターの事情により、送金方法が変更される場合があります（例：SWIFT銀行送金、PayPal等）。その際、発生する追加手数料は支払額から差し引かれるものとします。</li>
                            </ul>
                        </li>
                        <li><strong>手数料および為替レート:</strong> 送金手数料は支払額から控除されます。為替レートは送金時点での送金サービスのリアルタイムレートが適用されます。</li>
                    </ol>
                </Article>

                <Article title="第4条 (解約および権利失効)">
                    <p>パートナーはいつでも本契約を解約できます。解約時に残高が<strong className="text-white">最低支払基準額 (100 USD) 未満</strong>である場合、事務処理および送金コストの観点から、当該残高は没収され支払われません。</p>
                </Article>
            </div>
        </>
    );
}

function SpanishAgreement() {
    return (
        <>
            <h3 className="text-white font-bold mb-4 text-base tracking-wide border-b border-zinc-800 pb-2">
                Redcore Training Center - Acuerdo de Colaboración
            </h3>
            <div className="space-y-6">
                <Article title="Artículo 1 (Propósito)">
                    <p>El propósito de este Acuerdo es regular los derechos y obligaciones concernientes a las actividades de marketing y la liquidación de ingresos entre <strong>Redcore Training Center</strong> (en adelante, el "Centro") y el Socio.</p>
                </Article>

                <Article title="Artículo 2 (Reparto de Ingresos e Impuestos)">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Seguimiento:</strong> El Centro emite un 'Enlace de Referencia' único. El rendimiento se reconoce solo cuando un usuario se suscribe a través de este enlace.</li>
                        <li><strong>Comisión:</strong> Se calculará el <strong className="text-white">20% del monto del pago</strong> como ingreso del Socio.</li>
                        <li><strong>Impuestos:</strong> El pago final se determinará después de deducir los impuestos de retención aplicables según las leyes de Corea del Sur o del país de residencia del Socio.</li>
                    </ol>
                </Article>

                <Article title="Artículo 3 (Liquidación y Pago)">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Calendario:</strong> La liquidación es mensual. Los ingresos confirmados se pagarán el <strong className="text-white">día 10 del mes siguiente</strong>.</li>
                        <li><strong>Umbral Mínimo (100 USD):</strong> Los pagos solo se procesarán cuando los ingresos acumulados alcancen o superen los <strong className="text-white">100 USD</strong>. Si es inferior, se acumulará automáticamente para el mes siguiente.</li>
                        <li>
                            <strong>Método de Pago (Wise y Alternativas):</strong>
                            <ul className="list-disc pl-5 mt-1 text-zinc-500">
                                <li>El método principal es <strong>Wise</strong>.</li>
                                <li><strong className="text-amber-400">Cláusula de Excepción:</strong> Si el Socio no puede recibir fondos vía Wise, o debido a circunstancias del Centro, nos reservamos el derecho de cambiar el método de envío (ej. transferencia SWIFT). En tales casos, las tarifas adicionales se deducirán del pago.</li>
                            </ul>
                        </li>
                        <li><strong>Tarifas:</strong> Las tarifas de transacción se deducen del monto del pago.</li>
                    </ol>
                </Article>

                <Article title="Artículo 4 (Terminación)">
                    <p>Si al terminar el contrato el saldo restante es <strong className="text-white">inferior a 100 USD</strong>, dicho saldo se perderá y no será pagado debido a los costos administrativos.</p>
                </Article>
            </div>
        </>
    );
}

function GermanAgreement() {
    return (
        <>
            <h3 className="text-white font-bold mb-4 text-base tracking-wide border-b border-zinc-800 pb-2">
                Redcore Training Center - Partnerschaftsvereinbarung
            </h3>
            <div className="space-y-6">
                <Article title="Artikel 1 (Zweck)">
                    <p>Zweck dieser Vereinbarung ist die Regelung der Rechte und Pflichten bezüglich der Marketingpartnerschaft und der Umsatzabrechnung zwischen dem <strong>Redcore Training Center</strong> (nachfolgend "Zentrum") und dem Partner.</p>
                </Article>

                <Article title="Artikel 2 (Umsatzbeteiligung & Steuern)">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Tracking:</strong> Provisionen werden nur für Abonnements gewährt, die über den eindeutigen 'Empfehlungslink' des Partners abgeschlossen wurden.</li>
                        <li><strong>Provisionssatz:</strong> Die Provision beträgt <strong className="text-white">20% des Zahlungsbetrags</strong>.</li>
                        <li><strong>Steuern:</strong> Der Auszahlungsbetrag wird nach Abzug etwaiger Quellensteuern gemäß den Gesetzen der Republik Korea oder des Wohnsitzlandes des Partners berechnet.</li>
                    </ol>
                </Article>

                <Article title="Artikel 3 (Abrechnung und Zahlung)">
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Zahlungsplan:</strong> Die Auszahlung der im Vormonat bestätigten Einnahmen erfolgt am <strong className="text-white">10. des Folgemonats</strong>.</li>
                        <li><strong>Mindestauszahlungsgrenze (100 USD):</strong> Auszahlungen erfolgen erst ab einem kumulierten Guthaben von <strong className="text-white">100 USD</strong>. Beträge darunter werden auf den nächsten Monat übertragen.</li>
                        <li>
                            <strong>Zahlungsmethode (Wise & Alternativen):</strong>
                            <ul className="list-disc pl-5 mt-1 text-zinc-500">
                                <li>Die primäre Zahlungsmethode ist <strong>Wise</strong>.</li>
                                <li><strong className="text-amber-400">Ausnahmeklausel:</strong> Sollte der Partner keine Gelder über Wise empfangen können oder aufgrund von Umständen des Zentrums, behält sich das Zentrum das Recht vor, die Überweisungsmethode zu ändern (z. B. SWIFT). Zusätzliche Gebühren werden vom Auszahlungsbetrag abgezogen.</li>
                            </ul>
                        </li>
                    </ol>
                </Article>

                <Article title="Artikel 4 (Kündigung & Verfall)">
                    <p>Bei Vertragsbeendigung verfällt ein Restguthaben von <strong className="text-white">unter 100 USD</strong> und wird aufgrund der Transaktionskosten nicht ausgezahlt.</p>
                </Article>
            </div>
        </>
    );
}

function KoreanAgreement() {
    return (
        <>
            <h3 className="text-white font-bold mb-4 text-base tracking-wide border-b border-zinc-800 pb-2">
                Redcore Training Center - 파트너십 계약서
            </h3>
            <div className="space-y-6">
                <Article title="제1조 (목적)">
                    <p>본 약관은 <strong>Redcore Training Center</strong>(이하 "회사")와 파트너 간의 앱 마케팅 활동 및 수익 정산과 관련된 권리와 의무를 규정하는 것을 목적으로 합니다.</p>
                </Article>

                <Article title="제2조 (수익 배분)">
                    <p>파트너의 추천 링크를 통해 유입된 사용자가 유료 구독을 진행할 경우, 결제 금액의 <strong className="text-white">20%</strong>를 파트너 수익으로 산정합니다.</p>
                </Article>

                <Article title="제3조 (정산 및 지급)">
                    <p>매월 1일부터 말일까지 확정된 수익은 <strong className="text-white">익월 10일</strong>에 지급됩니다.</p>
                </Article>
            </div>
        </>
    );
}

// ============================================
// Helper Components
// ============================================

interface ArticleProps {
    title: string;
    children: React.ReactNode;
}

function Article({ title, children }: ArticleProps) {
    return (
        <div>
            <h4 className="text-zinc-200 font-bold mb-2">{title}</h4>
            {children}
        </div>
    );
}

// ============================================
// Component Mapping
// ============================================

const AGREEMENT_COMPONENTS: Record<LanguageRegion, React.FC> = {
    en: EnglishAgreement,
    ja: JapaneseAgreement,
    es: SpanishAgreement,
    de: GermanAgreement,
    ko: KoreanAgreement,
};
