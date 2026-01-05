import { PartnerApplication } from '@/types/partner';
import { CheckCircle, Clock, UserX } from 'lucide-react';

interface StatusBadgeProps {
    status: PartnerApplication["status"];
    labels: { approved: string; pending: string; rejected: string };
}

export function StatusBadge({ status, labels }: StatusBadgeProps) {
    switch (status) {
        case "approved":
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle size={12} /> {labels.approved}
                </span>
            );
        case "pending":
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Clock size={12} /> {labels.pending}
                </span>
            );
        case "rejected":
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <UserX size={12} /> {labels.rejected}
                </span>
            );
        default:
            return null;
    }
}
