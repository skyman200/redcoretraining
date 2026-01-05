import React, { useRef } from 'react';
import { PartnerApplication, PartnerPayout } from '@/types/partner';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentStatementProps {
    isOpen: boolean;
    onClose: () => void;
    payout: PartnerPayout;
    partner: PartnerApplication;
}

export default function PaymentStatement({ isOpen, onClose, payout, partner }: PaymentStatementProps) {
    const { t } = useLanguage();
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        printWindow.document.write(`
            <html>
                <head>
                    <title>Payment Statement - ${payout.id}</title>
                    <style>
                        body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #000; }
                        .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #000; padding-bottom: 20px; }
                        .logo { font-size: 24px; font-weight: bold; }
                        .title { font-size: 32px; font-weight: bold; margin-bottom: 40px; text-align: center; }
                        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
                        .section-title { font-weight: bold; border-bottom: 1px solid #ccc; margin-bottom: 10px; padding-bottom: 5px; }
                        .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
                        .label { color: #666; font-size: 14px; }
                        .value { font-weight: 500; }
                        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        .table th, .table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                        .table th { background-color: #f9f9f9; }
                        .total { margin-top: 20px; text-align: right; font-size: 20px; font-weight: bold; }
                        .footer { margin-top: 60px; font-size: 12px; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
                    </style>
                </head>
                <body>
                    ${printContent.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" style={{ zIndex: 100 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                >
                    {/* Toolbar */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-semibold text-gray-700">Payment Statement Review</h3>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                            >
                                <Printer size={16} /> Print / Save PDF
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Printable Area - Hidden scroll, centered */}
                    <div className="flex-1 overflow-auto bg-gray-100 p-8">
                        <div ref={printRef} className="bg-white p-12 shadow-sm mx-auto max-w-[210mm] min-h-[297mm]">
                            <div className="header">
                                <div className="logo">REDCORE TRAINING</div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Statement #</div>
                                    <div style={{ fontWeight: 'bold' }}>{payout.id.slice(0, 8).toUpperCase()}</div>
                                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Date</div>
                                    <div>{new Date(payout.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>

                            <div className="title">PAYMENT STATEMENT</div>

                            <div className="grid">
                                <div>
                                    <div className="section-title">FROM (Payer)</div>
                                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Redcore Training (Dr. Kang)</div>
                                    <div style={{ color: '#555', fontSize: '14px', marginTop: '4px' }}>
                                        Seoul, South Korea<br />
                                        Business Reg: 123-45-67890<br />
                                        contact@redcoretraining.com
                                    </div>
                                </div>
                                <div>
                                    <div className="section-title">TO (Payee)</div>
                                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{partner.name}</div>
                                    <div style={{ color: '#555', fontSize: '14px', marginTop: '4px' }}>
                                        {partner.email}<br />
                                        {partner.country || 'N/A'}<br />
                                        Type: {partner.type === 'domestic' ? 'Domestic (Korea)' : 'International'} Partner
                                    </div>
                                </div>
                            </div>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Period</th>
                                        <th style={{ textAlign: 'right' }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>Marketing & Promotion Services</strong><br />
                                            <span style={{ fontSize: '12px', color: '#666' }}>Sales Commission Settlement</span>
                                            {payout.description && <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{payout.description}</div>}
                                        </td>
                                        <td>
                                            {new Date(payout.periodStart).toLocaleDateString()} - {new Date(payout.periodEnd).toLocaleDateString()}
                                        </td>
                                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                            {payout.currency} {payout.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="total">
                                Total Paid: {payout.currency} {payout.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>

                            <div style={{ marginTop: '40px', borderTop: '1px dashed #ccc', paddingTop: '20px' }}>
                                <div className="section-title">Payment Details</div>
                                <div className="row">
                                    <span className="label">Status:</span>
                                    <span className="value" style={{ textTransform: 'capitalize' }}>{payout.status}</span>
                                </div>
                                <div className="row">
                                    <span className="label">Paid At:</span>
                                    <span className="value">{payout.paidAt ? new Date(payout.paidAt).toLocaleString() : 'Pending'}</span>
                                </div>
                                <div className="row">
                                    <span className="label">Bank Info:</span>
                                    <span className="value">
                                        {partner.bankName} ({partner.accountNumber})<br />
                                        {partner.swiftCode && `SWIFT: ${partner.swiftCode}`}
                                    </span>
                                </div>
                            </div>

                            <div className="footer">
                                <p>This document serves as proof of payment for services rendered. <br />It is recognized as a valid substitute for an invoice for tax reporting purposes.</p>
                                <p>© {new Date().getFullYear()} Redcore Training. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
