import React, { useState } from "react";
import { Copy, ExternalLink, FileText, Check } from "lucide-react";

export function PartnerResources() {
    return (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ResourceCard
                title="Partnership Proposal"
                subtitle="Share this link with potential partners to introduce Redcore."
                path="/partners/proposal"
                icon={<FileText className="w-5 h-5 text-red-500" />}
            />
            <ResourceCard
                title="Partner Guide"
                subtitle="Step-by-step guide for registration and settlement."
                path="/partners/guide"
                icon={<FileText className="w-5 h-5 text-blue-500" />}
            />
        </div>
    );
}

function ResourceCard({ title, subtitle, path, icon }: { title: string; subtitle: string; path: string; icon: React.ReactNode }) {
    const [copied, setCopied] = useState(false);

    // Check if window is defined (client-side)
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = `${origin}${path}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
                    <h3 className="font-bold text-gray-900">{title}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex-grow bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-500 font-mono truncate border border-gray-100">
                    {fullUrl || path} {/* Show path if SSR */}
                </div>
                <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                    title="Copy Link"
                >
                    {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                </button>
                <a
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                    title="Open in new tab"
                >
                    <ExternalLink size={18} />
                </a>
            </div>
        </div>
    );
}
