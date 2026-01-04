"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/services/firebase/client";
import { doc, onSnapshot } from "firebase/firestore";
import { PartnerApplication } from "@/types/partner";

interface AuthContextType {
    user: User | null;
    partnerData: PartnerApplication | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    partnerData: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [partnerData, setPartnerData] = useState<PartnerApplication | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Skip auth if Firebase is not initialized (SSG build or missing config)
        if (!auth) {
            setLoading(false);
            return;
        }

        let unsubscribePartner: (() => void) | null = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser && db) {
                // Listen to partner application updates
                unsubscribePartner = onSnapshot(
                    doc(db, "partner_applications", firebaseUser.uid),
                    (docSnap) => {
                        if (docSnap.exists()) {
                            setPartnerData(docSnap.data() as PartnerApplication);
                        } else {
                            setPartnerData(null);
                        }
                    }
                );
            } else {
                setPartnerData(null);
            }

            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribePartner) unsubscribePartner();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, partnerData, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
