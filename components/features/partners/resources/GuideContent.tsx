import React from "react";
import { LanguageRegion } from "@/lib/partnerConstants";
import GuideKo from "./languages/GuideKo";
import GuideEn from "./languages/GuideEn";
// Import other languages later

interface GuideContentProps {
    languageRegion: LanguageRegion;
}

export default function GuideContent({ languageRegion }: GuideContentProps) {
    const components: Record<LanguageRegion, React.FC> = {
        ko: GuideKo,
        en: GuideEn,
        ja: GuideEn, // Fallback for now
        es: GuideEn, // Fallback for now
        de: GuideEn, // Fallback for now
    };

    const Content = components[languageRegion] || components.en;

    return <Content />;
}
