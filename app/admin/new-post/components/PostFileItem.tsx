import { Save, X } from 'lucide-react';
import { PostFile } from '@/types/post';

interface PostFileItemProps {
    file: PostFile;
    index: number;
    onRemove: (index: number) => void;
}

export function PostFileItem({ file, index, onRemove }: PostFileItemProps) {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-gray-200 p-2 rounded">
                    <Save size={16} className="text-gray-600" />
                </div>
                <div className="min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500 truncate">{file.resourceType || 'File'}</p>
                </div>
            </div>
            <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-red-600 hover:text-red-700 p-1"
            >
                <X size={20} />
            </button>
        </div>
    );
}
