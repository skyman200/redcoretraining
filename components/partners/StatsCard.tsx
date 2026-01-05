'use client';

import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: 'sales' | 'commission' | 'pending' | 'paid';
    variant?: 'default' | 'success' | 'warning' | 'info';
}

const iconMap = {
    sales: DollarSign,
    commission: TrendingUp,
    pending: Clock,
    paid: CheckCircle,
};

const variantStyles = {
    default: 'bg-gray-50 border-gray-200 text-gray-900',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
};

const iconStyles = {
    default: 'bg-gray-100 text-gray-600',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-amber-100 text-amber-600',
    info: 'bg-blue-100 text-blue-600',
};

export default function StatsCard({
    title,
    value,
    subtitle,
    icon,
    variant = 'default'
}: StatsCardProps) {
    const Icon = iconMap[icon];

    return (
        <div className={`p-6 rounded-2xl border ${variantStyles[variant]}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium opacity-70">{title}</p>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                    {subtitle && (
                        <p className="text-xs mt-1 opacity-60">{subtitle}</p>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${iconStyles[variant]}`}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
}
