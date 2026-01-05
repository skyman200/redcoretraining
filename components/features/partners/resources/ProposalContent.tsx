import React from "react";
import { LanguageRegion } from "@/lib/partnerConstants";
import ProposalKo from "./languages/ProposalKo";
import ProposalEn from "./languages/ProposalEn";
import ProposalJa from "./languages/ProposalJa";
import ProposalEs from "./languages/ProposalEs";
import ProposalDe from "./languages/ProposalDe";

interface ProposalContentProps {
    languageRegion: LanguageRegion;
}

export default function ProposalContent({ languageRegion }: ProposalContentProps) {
    const components: Record<LanguageRegion, React.FC> = {
        ko: ProposalKo,
        en: ProposalEn,
        ja: ProposalJa,
        es: ProposalEs,
        de: ProposalDe,
    };

    const Content = components[languageRegion] || components.en;

    return <Content />;
}
