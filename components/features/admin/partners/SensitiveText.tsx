import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface SensitiveTextProps {
    text?: string;
}

export function SensitiveText({ text }: SensitiveTextProps) {
    const [visible, setVisible] = useState(false);

    if (!text) return <span className="text-xs text-gray-400 font-mono mt-0.5">미입력</span>;

    return (
        <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-400 font-mono">
                {visible ? text : `${text.slice(0, 8)}******`}
            </span>
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setVisible(!visible); }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title={visible ? "숨기기" : "보기"}
            >
                {visible ? <EyeOff size={12} /> : <Eye size={12} />}
            </button>
        </div>
    );
}
