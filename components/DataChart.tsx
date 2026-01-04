'use client';

import { motion } from 'framer-motion';

interface DataPoint {
    label: string;
    value: number;
    color?: string;
}

interface DataChartProps {
    title: string;
    data: DataPoint[];
    type?: 'bar' | 'line';
    maxValue?: number;
    variant?: 'default' | 'gemini';
}

export default function DataChart({ title, data, type = 'bar', maxValue = 100, variant = 'default' }: DataChartProps) {
    const getBarStyle = (pointColor?: string) => {
        if (pointColor) return { className: pointColor };
        if (variant === 'gemini') {
            return {
                style: {
                    background: 'linear-gradient(to top, rgb(76,29,149), rgb(220,20,60), rgb(255,69,0), rgb(255,165,0), rgb(255,215,0))'
                }
            };
        }
        return { className: 'bg-red-600' };
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full">
            <h3 className="text-xl font-bold mb-6 text-gray-900">{title}</h3>

            <div className="flex items-end justify-between gap-4 h-64">
                {data.map((point, index) => {
                    const barStyle = getBarStyle(point.color);
                    return (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1 group h-full justify-end">
                            <div className="w-full h-full flex items-end justify-center relative">
                                <motion.div
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                                    className={`w-full max-w-[40px] rounded-t-lg relative ${barStyle.className || ''}`}
                                    style={{
                                        ...barStyle.style,
                                        height: `${(point.value / maxValue) * 100}%`,
                                        transformOrigin: 'bottom'
                                    }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">
                                        {point.value}%
                                    </div>
                                </motion.div>
                            </div>
                            <span className="text-xs md:text-sm font-medium text-gray-500 text-center">{point.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
