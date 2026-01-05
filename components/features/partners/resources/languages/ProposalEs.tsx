import React from "react";

export default function ProposalEs() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 text-zinc-300 leading-relaxed pb-20">
            {/* Title Section */}
            <div className="text-center space-y-6 border-b border-zinc-800 pb-16">
                <span className="text-red-500 font-bold tracking-widest text-sm uppercase">Partnership Proposal</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                    Innove el futuro de la<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Salud Digital</span><br />
                    con Redcore.
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto pt-4">
                    Soluciones de rehabilitación basadas en datos. Ahora es su oportunidad de monetizar su red.
                </p>
            </div>

            {/* Vision Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">¿Por qué Redcore?</h2>
                    <p className="text-lg">
                        Desde 2016, Redcore Training Center ha acumulado <strong>decenas de miles de datos clínicos</strong>.
                        Ofrecemos <strong>soluciones de rehabilitación científica</strong> diseñadas por fisioterapeutas, no solo una simple aplicación de ejercicios.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Aplicación SOOM BREATHING probada</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Evidenciado por casos reales de recuperación</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Plataforma móvil globalmente escalable</span>
                        </li>
                    </ul>
                    <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 mt-4">
                        <h4 className="font-bold text-white mb-2">✨ Beneficio de Prueba Gratuita</h4>
                        <p className="text-sm text-zinc-300">
                            Todos obtienen una <strong>prueba gratuita de 7 días</strong> al descargar la aplicación.<br />
                            También proporcionamos <strong>códigos promocionales gratuitos de 1 mes</strong> a solicitud del socio para fines de marketing.
                        </p>
                    </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 h-full flex flex-col justify-center">
                    <div className="text-center space-y-2">
                        <div className="text-5xl font-bold text-white">20%</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-widest">Revenue Share</div>
                        <p className="pt-4 text-zinc-400">
                            Tasa de comisión líder en la industria.<br />
                            Gane tanto como su influencia.
                        </p>
                    </div>
                </div>
            </section>

            {/* Revenue Model */}
            <section className="space-y-8 bg-zinc-900/30 rounded-3xl p-8 md:p-12 border border-zinc-800">
                <h2 className="text-3xl font-bold text-white text-center">Modelo de Ingresos</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-2xl">🔗</div>
                        <h3 className="text-xl font-bold text-white">1. Enlace y Compartir</h3>
                        <p className="text-sm">Obtenga su enlace de socio único y compártalo en su blog, redes sociales o YouTube.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-2xl">👥</div>
                        <h3 className="text-xl font-bold text-white">2. Registro de Usuario</h3>
                        <p className="text-sm">Los usuarios se registran a través de su enlace y comienzan una suscripción paga.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">$</div>
                        <h3 className="text-xl font-bold text-white">3. Recibir Pago</h3>
                        <p className="text-sm">El 20% del monto del pago se liquida en su cuenta mensualmente.<br /><span className="text-zinc-500 text-xs">(Las transferencias internacionales inferiores a $100 se acumularán).</span></p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center space-y-6 pt-12">
                <h2 className="text-3xl font-bold text-white">Empieza Ahora</h2>
                <p className="text-zinc-400">
                    El registro es gratuito y puede empezar en cualquier momento.<br />
                    Esperamos socios que crezcan con Redcore.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="/partners/board" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors">
                        Solicitar como Socio
                    </a>
                </div>
            </div>
        </div>
    );
}
