import { useState, useCallback } from "react";
import { partnersApi } from "@/services/api/partnersApi";
import { PartnerApplication, PartnerApplicationFormData } from "@/types/partner";
import { ApiResult } from "@/types/api";

export function usePartners() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitApplication = useCallback(async (
        uid: string,
        email: string | null,
        data: PartnerApplicationFormData
    ): Promise<ApiResult<PartnerApplication>> => {
        setLoading(true);
        setError(null);
        const result = await partnersApi.submitApplication(uid, email, data);
        if (result.error) {
            setError(result.error.message);
        }
        setLoading(false);
        return result;
    }, []);

    const getApplication = useCallback(async (uid: string): Promise<ApiResult<PartnerApplication>> => {
        setLoading(true);
        setError(null);
        const result = await partnersApi.getApplication(uid);
        if (result.error) {
            setError(result.error.message);
        }
        setLoading(false);
        return result;
    }, []);

    return {
        loading,
        error,
        submitApplication,
        getApplication,
    };
}
