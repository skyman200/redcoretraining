'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

interface MonthSelectorProps {
    selectedYear: number;
    selectedMonth: number;
    onYearChange: (year: number) => void;
    onMonthChange: (month: number) => void;
}

export default function MonthSelector({
    selectedYear,
    selectedMonth,
    onYearChange,
    onMonthChange,
}: MonthSelectorProps) {
    const { t } = useLanguage();
    const d = t.partners.dashboard;

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 3 }, (_, i) => currentYear - i);

    const months = [
        { value: 1, label: d.months.jan },
        { value: 2, label: d.months.feb },
        { value: 3, label: d.months.mar },
        { value: 4, label: d.months.apr },
        { value: 5, label: d.months.may },
        { value: 6, label: d.months.jun },
        { value: 7, label: d.months.jul },
        { value: 8, label: d.months.aug },
        { value: 9, label: d.months.sep },
        { value: 10, label: d.months.oct },
        { value: 11, label: d.months.nov },
        { value: 12, label: d.months.dec },
    ];

    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <select
                    value={selectedYear}
                    onChange={(e) => onYearChange(Number(e.target.value))}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}{d.yearSuffix}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
            </div>

            <div className="relative">
                <select
                    value={selectedMonth}
                    onChange={(e) => onMonthChange(Number(e.target.value))}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                >
                    {months.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
            </div>
        </div>
    );
}
