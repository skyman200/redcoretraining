import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export interface ConfirmModalState {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    confirmColor: "green" | "red" | "orange";
    onConfirm: () => void;
}

interface ConfirmModalProps {
    state: ConfirmModalState;
    onClose: () => void;
    m: any; // Translation for 'cancel'
}

export function ConfirmModal({ state, onClose, m }: ConfirmModalProps) {
    return (
        <AnimatePresence>
            {state.isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-full ${state.confirmColor === "red" ? "bg-red-100" :
                                state.confirmColor === "orange" ? "bg-orange-100" :
                                    "bg-green-100"
                                }`}>
                                <AlertTriangle className={`w-5 h-5 ${state.confirmColor === "red" ? "text-red-600" :
                                    state.confirmColor === "orange" ? "text-orange-600" :
                                        "text-green-600"
                                    }`} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{state.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{state.message}</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                {m.cancel}
                            </button>
                            <button
                                type="button"
                                onClick={state.onConfirm}
                                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${state.confirmColor === "red" ? "bg-red-600 hover:bg-red-700" :
                                    state.confirmColor === "orange" ? "bg-orange-600 hover:bg-orange-700" :
                                        "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                {state.confirmText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
