import React from "react";
import { LanguageRegion } from "@/lib/partnerConstants";
import GuideKo from "./languages/GuideKo";
import GuideEn from "./languages/GuideEn";
import GuideJa from "./languages/GuideJa";
import GuideEs from "./languages/GuideEs";
import GuideDe from "./languages/GuideDe";

interface GuideContentProps {
    languageRegion: LanguageRegion;
}

export default function GuideContent({ languageRegion }: GuideContentProps) {
    const components: Record<LanguageRegion, React.FC> = {
        ko: GuideKo,
        en: GuideEn,
        ja: GuideJa,
        es: GuideEs,
        de: GuideDe,
    };

    const Content = components[languageRegion] || components.en;

    return <Content />;
}
