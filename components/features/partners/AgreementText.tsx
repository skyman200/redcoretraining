import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AgreementText() {
    const { t } = useLanguage();
    const { agreement } = t.partners;

    return (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 h-48 overflow-y-auto text-sm text-zinc-400 leading-relaxed scrollbar-hide">
            <p className="mb-4">[{agreement.title}]</p>
            <p className="mb-2">{agreement.article1}</p>
            <p className="mb-4">{agreement.article1Desc}</p>
            <p className="mb-2">{agreement.article2}</p>
            <p className="mb-4">{agreement.article2Desc}</p>
            <p className="mb-2">{agreement.article3}</p>
            <p>{agreement.article3Desc}</p>
        </div>
    );
}
