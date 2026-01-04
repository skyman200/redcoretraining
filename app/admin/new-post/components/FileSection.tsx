import FileUpload from '@/components/FileUpload';
import { PostFileItem } from './PostFileItem';
import { PostFile } from '@/types/post';

interface FileSectionProps {
    files: PostFile[];
    onRemove: (index: number) => void;
    onUploadComplete: (file: any) => void;
    newFileName: string;
    setNewFileName: (val: string) => void;
    newFileUrl: string;
    setNewFileUrl: (val: string) => void;
    onAddManual: () => void;
}

export function FileSection({
    files,
    onRemove,
    onUploadComplete,
    newFileName,
    setNewFileName,
    newFileUrl,
    setNewFileUrl,
    onAddManual
}: FileSectionProps) {
    return (
        <div className="space-y-6">
            <label className="block text-sm font-bold mb-4">첨부 파일</label>

            {/* Existing files */}
            {files.length > 0 && (
                <div className="space-y-2 mb-4">
                    {files.map((file, index) => (
                        <PostFileItem
                            key={index}
                            file={file}
                            index={index}
                            onRemove={onRemove}
                        />
                    ))}
                </div>
            )}

            {/* Add new file */}
            <div className="space-y-4">
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-black transition-colors">
                    <p className="font-medium mb-4 text-gray-700 text-center">파일 업로드</p>
                    <FileUpload
                        onUploadComplete={onUploadComplete}
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">또는 링크 직접 입력</span>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 rounded border border-gray-200 space-y-3">
                    <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black transition-colors bg-white"
                        placeholder="파일 이름 (예: pilates-guide.pdf)"
                    />
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newFileUrl}
                            onChange={(e) => setNewFileUrl(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black transition-colors bg-white"
                            placeholder="파일 URL (Google Drive 링크 등)"
                        />
                        <button
                            type="button"
                            onClick={onAddManual}
                            disabled={!newFileName || !newFileUrl}
                            className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded whitespace-nowrap"
                        >
                            추가
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
