import React from "react";

export default function GuideDe() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 text-zinc-300 leading-relaxed pb-20">
            {/* Header */}
            <div className="text-center space-y-4 border-b border-zinc-800 pb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Partner-Registrierungsleitfaden</h1>
                <p className="text-xl text-zinc-400">Schritt-für-Schritt-Anleitung, um Partner im Redcore Training Center zu werden.</p>
            </div>

            {/* Step 1 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">1</div>
                    <h2 className="text-2xl font-bold text-white">Konto Erstellen</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        Besuchen Sie das Partner Center und erstellen Sie ein Konto über [Anmelden] oder [Mit Google fortfahren].
                        <br />
                        Wenn Sie bereits ein Konto haben, melden Sie sich bitte an.
                    </p>
                </div>
            </section>

            {/* Step 2 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">2</div>
                    <h2 className="text-2xl font-bold text-white">Bewerben & Infos Senden</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        Klicken Sie nach dem Anmelden auf die Schaltfläche <strong>[Als Partner bewerben]</strong>.
                        Bitte stellen Sie sicher, dass alle Abrechnungsinformationen korrekt sind.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-white">
                        <li><strong>Region Auswählen:</strong> Wählen Sie Ihr Wohnsitzland oder Ihre Sprachregion.</li>
                        <li><strong>Basisinfos:</strong> Geben Sie Ihren vollständigen Namen und Ihre Kontaktinformationen ein.</li>
                        <li><strong>Auszahlungsinfos:</strong> Geben Sie Kontodetails an, um Ihre 20% Provision zu erhalten.
                            <ul className="list-[circle] pl-5 mt-2 text-zinc-400 space-y-1">
                                <li>Internationale Partner erhalten Auszahlungen hauptsächlich über <strong>Wise</strong>.</li>
                                <li>Wenn Sie Wise nicht nutzen, geben Sie bitte Ihren SWIFT-Code und Ihre Bankdaten an.</li>
                                <li className="text-red-400">Hinweis: Auszahlungen unter $100 werden auf den nächsten Monat übertragen.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Step 3 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">3</div>
                    <h2 className="text-2xl font-bold text-white">Genehmigungsprozess</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        Ihr Bewerbungsstatus wird <strong>'Ausstehend'</strong> sein.
                        Wir prüfen Bewerbungen in der Regel innerhalb von 1-2 Werktagen.
                    </p>
                    <p>
                        Nach der Genehmigung erhalten Sie vollen Zugriff auf das Partner-Dashboard.
                    </p>
                </div>
            </section>

            {/* Step 4 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">4</div>
                    <h2 className="text-2xl font-bold text-white">Verdienst Beginnen</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        Klicken Sie in Ihrem Dashboard auf <strong>[Partnerlink kopieren]</strong>.
                    </p>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                        <h4 className="font-bold text-white">🚀 Marketing-Tipps</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>Teilen Sie Ihren einzigartigen Link in sozialen Medien, Blogs oder auf YouTube.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>Verdienen Sie <strong>20% Provision</strong> für jedes kostenpflichtige Abonnement von Benutzern, die sich über Ihren Link anmelden.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>Verfolgen Sie Ihre Verkäufe und Auszahlungen in Echtzeit auf dem Dashboard.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
