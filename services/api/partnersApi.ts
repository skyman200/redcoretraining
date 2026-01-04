import { db } from "../firebase/client";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { PartnerApplication, PartnerApplicationFormData } from "@/types/partner";
import { ApiResult } from "@/types/api";

const COLLECTION_NAME = "partner_applications";

export const partnersApi = {
    async submitApplication(
        uid: string,
        email: string | null,
        data: PartnerApplicationFormData
    ): Promise<ApiResult<PartnerApplication>> {
        try {
            const application: PartnerApplication = {
                ...data,
                uid,
                email,
                status: "pending",
                createdAt: new Date().toISOString(),
                agreedAt: new Date().toISOString(),
            };

            await setDoc(doc(db, COLLECTION_NAME, uid), application);
            return { data: application, error: null };
        } catch (error) {
            return { error: error as Error };
        }
    },

    async getApplication(uid: string): Promise<ApiResult<PartnerApplication>> {
        try {
            const docSnap = await getDoc(doc(db, COLLECTION_NAME, uid));
            if (docSnap.exists()) {
                return { data: docSnap.data() as PartnerApplication, error: null };
            }
            return { error: new Error("Application not found") };
        } catch (error) {
            return { error: error as Error };
        }
    }
};
