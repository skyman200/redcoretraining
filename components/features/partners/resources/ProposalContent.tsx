import React from "react";
import { LanguageRegion } from "@/lib/partnerConstants";
import ProposalKo from "./languages/ProposalKo";
import ProposalEn from "./languages/ProposalEn";
// Import other languages later

interface ProposalContentProps {
    languageRegion: LanguageRegion;
}

export default function ProposalContent({ languageRegion }: ProposalContentProps) {
    const components: Record<LanguageRegion, React.FC> = {
        ko: ProposalKo,
        en: ProposalEn,
        ja: ProposalEn, // Fallback
        es: ProposalEn, // Fallback
        de: ProposalEn, // Fallback
    };

    const Content = components[languageRegion] || components.en;

    return <Content />;
}
