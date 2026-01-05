import React from "react";

export default function GuideEs() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 text-zinc-300 leading-relaxed pb-20">
            {/* Header */}
            <div className="text-center space-y-4 border-b border-zinc-800 pb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Guía de Registro de Socios</h1>
                <p className="text-xl text-zinc-400">Instrucciones paso a paso para unirse a Redcore Training Center como socio.</p>
            </div>

            {/* Step 1 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">1</div>
                    <h2 className="text-2xl font-bold text-white">Crear Cuenta</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        Visite el Centro de Socios y cree una cuenta a través de [Registrarse] o [Continuar con Google].
                        <br />
                        Si ya tiene una cuenta, inicie sesión.
                    </p>
                </div>
            </section>

            {/* Step 2 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">2</div>
                    <h2 className="text-2xl font-bold text-white">Aplicar y Enviar Información</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        Después de iniciar sesión, haga clic en el botón <strong>[Solicitar como Socio]</strong>.
                        Asegúrese de que toda la información de liquidación sea precisa.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-white">
                        <li><strong>Seleccionar Región:</strong> Elija su país de residencia o región lingüística.</li>
                        <li><strong>Información Básica:</strong> Ingrese su nombre completo e información de contacto.</li>
                        <li><strong>Información de Pago:</strong> Proporcione los detalles de la cuenta para recibir su comisión del 20%.
                            <ul className="list-[circle] pl-5 mt-2 text-zinc-400 space-y-1">
                                <li>Los socios internacionales aceptan pagos principalmente a través de <strong>Wise</strong>.</li>
                                <li>Si no usa Wise, proporcione su código SWIFT y detalles bancarios.</li>
                                <li className="text-red-400">Nota: Los pagos inferiores a $100 se transferirán al mes siguiente.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Step 3 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">3</div>
                    <h2 className="text-2xl font-bold text-white">Proceso de Aprobación</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        El estado de su solicitud será <strong>'Pendiente'</strong>.
                        Normalmente revisamos las solicitudes dentro de 1-2 días hábiles.
                    </p>
                    <p>
                        Una vez aprobado, obtendrá acceso completo al Panel de Socios.
                    </p>
                </div>
            </section>

            {/* Step 4 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">4</div>
                    <h2 className="text-2xl font-bold text-white">Empezar a Ganar</h2>
                </div>
                <div className="pl-16 space-y-4">
                    <p>
                        Haga clic en <strong>[Copiar Enlace de Socio]</strong> en su panel.
                    </p>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                        <h4 className="font-bold text-white">🚀 Consejos de Marketing</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>Comparta su enlace único en redes sociales, blogs o YouTube.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>Gane <strong>20% de comisión</strong> en cada suscripción paga de usuarios que se registren a través de su enlace.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">✓</span>
                                <span>Rastree sus ventas y pagos en tiempo real en el panel.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
