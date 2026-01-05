"use client";

import React from "react";

export default function AgreementTextInternational() {
    return (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 h-64 overflow-y-auto text-sm text-zinc-400 leading-relaxed scrollbar-hide text-justify font-light">
            <h3 className="text-white font-bold mb-4 text-base tracking-wide border-b border-zinc-800 pb-2">
                Redcore Training Center - International Partnership Agreement
            </h3>

            <div className="space-y-6">
                <div>
                    <h4 className="text-zinc-200 font-bold mb-2">1. Partnership Terms & Conditions</h4>

                    <div className="mb-4">
                        <strong className="text-white block mb-1">Article 1 (Purpose)</strong>
                        <p>The purpose of this Agreement is to regulate the rights and obligations concerning app marketing partnership activities and revenue settlement between <strong>Redcore Training Center</strong> (hereinafter referred to as the "Center") and the <strong>Partner</strong>.</p>
                    </div>

                    <div className="mb-4">
                        <strong className="text-white block mb-1">Article 2 (Revenue Share & Taxes)</strong>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li><strong>Referral Tracking:</strong> The Center issues a unique 'Referral Link' to the Partner. Performance is recognized only when a user accesses the service through this link, completes membership registration, and proceeds with a paid subscription.</li>
                            <li><strong>Commission Rate:</strong> For subscriptions meeting these conditions, <strong>20% of the payment amount</strong> will be calculated as the Partner's revenue.</li>
                            <li><strong>Taxation:</strong> The final payout amount will be determined after deducting any applicable withholding taxes required by the tax laws of the Republic of Korea or the Partner's country of residence.</li>
                        </ol>
                    </div>

                    <div className="mb-4">
                        <strong className="text-white block mb-1">Article 3 (Settlement and Payment)</strong>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li><strong>Payment Schedule:</strong> Settlement is processed monthly. Revenue confirmed from the 1st to the last day of each month will be paid on the <strong>10th of the following month</strong>. (If the 10th is a weekend or holiday, payment will be made on the next business day.)</li>
                            <li><strong>Minimum Payout Threshold (USD 100):</strong>
                                <ul className="list-disc pl-5 mt-1 text-zinc-500">
                                    <li>To optimize international transaction costs, payouts will only be processed when the cumulative unpaid revenue reaches or exceeds <strong>USD 100</strong>.</li>
                                    <li>If the accrued revenue is <strong>less than USD 100</strong>, it will automatically <strong>roll over</strong> to the next month. The amount will continue to accumulate until it exceeds the threshold.</li>
                                </ul>
                            </li>
                            <li><strong>Payment Method (Wise):</strong>
                                <ul className="list-disc pl-5 mt-1 text-zinc-500">
                                    <li>All international payments are processed via <strong>Wise</strong> (formerly TransferWise) to ensure transparency and favorable exchange rates.</li>
                                    <li>Payments will be sent in <strong>USD</strong> (or the Partner's local currency supported by Wise).</li>
                                    <li><strong>Transaction Fees:</strong> Any transaction fees incurred by Wise during the transfer process shall be <strong>deducted from the payout amount</strong>.</li>
                                </ul>
                            </li>
                            <li><strong>Exchange Rate:</strong> The currency exchange rate will be based on the real-time rate provided by Wise at the time of the transaction.</li>
                        </ol>
                    </div>

                    <div className="mb-4">
                        <strong className="text-white block mb-1">Article 4 (Termination & Forfeiture)</strong>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>Partners may terminate this agreement at any time.</li>
                            <li>Upon voluntary termination, if the remaining balance is <strong>below the Minimum Payout Threshold (USD 100)</strong>, the balance will be forfeited and will not be paid out, due to administrative and transaction costs.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
