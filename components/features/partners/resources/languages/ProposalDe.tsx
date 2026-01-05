import React from "react";

export default function ProposalDe() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 text-zinc-300 leading-relaxed pb-20">
            {/* Title Section */}
            <div className="text-center space-y-6 border-b border-zinc-800 pb-16">
                <span className="text-red-500 font-bold tracking-widest text-sm uppercase">Partnership Proposal</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                    Innovieren Sie die Zukunft der<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Digitalen Gesundheit</span><br />
                    mit Redcore.
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto pt-4">
                    Datenbasierte Rehabilitationslösungen. Jetzt ist Ihre Chance, Ihr Netzwerk zu monetarisieren.
                </p>
            </div>

            {/* Vision Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">Warum Redcore?</h2>
                    <p className="text-lg">
                        Seit 2016 hat das Redcore Training Center <strong>zehntausende von klinischen Datenpunkten</strong> gesammelt.
                        Wir bieten <strong>wissenschaftliche Rehabilitationslösungen</strong>, die von Physiotherapiespezialisten entwickelt wurden, nicht nur eine einfache Trainings-App.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Bewährte SOOM BREATHING Anwendung</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Belegt durch echte Genesungsfälle</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Global skalierbare mobile Plattform</span>
                        </li>
                    </ul>
                    <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 mt-4">
                        <h4 className="font-bold text-white mb-2">✨ Kostenloser Testvorteil</h4>
                        <p className="text-sm text-zinc-300">
                            Jeder erhält eine <strong>7-tägige kostenlose Testversion</strong> beim Herunterladen der App.<br />
                            Auf Anfrage bieten wir Partnern auch <strong>kostenlose 1-Monats-Promo-Codes</strong> für Marketingzwecke an.
                        </p>
                    </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 h-full flex flex-col justify-center">
                    <div className="text-center space-y-2">
                        <div className="text-5xl font-bold text-white">20%</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-widest">Revenue Share</div>
                        <p className="pt-4 text-zinc-400">
                            Branchenführende Provisionsrate.<br />
                            Verdienen Sie so viel wie Ihr Einfluss.
                        </p>
                    </div>
                </div>
            </section>

            {/* Revenue Model */}
            <section className="space-y-8 bg-zinc-900/30 rounded-3xl p-8 md:p-12 border border-zinc-800">
                <h2 className="text-3xl font-bold text-white text-center">Erlösmodell</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-2xl">🔗</div>
                        <h3 className="text-xl font-bold text-white">1. Link & Teilen</h3>
                        <p className="text-sm">Holen Sie sich Ihren einzigartigen Partnerlink und teilen Sie ihn auf Ihrem Blog, in sozialen Medien oder auf YouTube.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-2xl">👥</div>
                        <h3 className="text-xl font-bold text-white">2. Benutzeranmeldung</h3>
                        <p className="text-sm">Benutzer melden sich über Ihren Link an und starten ein kostenpflichtiges Abonnement.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">$</div>
                        <h3 className="text-xl font-bold text-white">3. Auszahlung</h3>
                        <p className="text-sm">20% des Zahlungsbetrags werden monatlich auf Ihr Konto abgerechnet.<br /><span className="text-zinc-500 text-xs">(Internationale Überweisungen unter $100 werden übertragen.)</span></p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center space-y-6 pt-12">
                <h2 className="text-3xl font-bold text-white">Jetzt Starten</h2>
                <p className="text-zinc-400">
                    Die Registrierung ist kostenlos und Sie können jederzeit beginnen.<br />
                    Wir warten auf Partner, die mit Redcore wachsen.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="/partners/board" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors">
                        Als Partner bewerben
                    </a>
                </div>
            </div>
        </div>
    );
}
