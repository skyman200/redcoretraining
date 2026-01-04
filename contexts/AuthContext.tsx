"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { PartnerApplication } from "@/types/partner";
import { partnersApi } from "@/services/api/partnersApi";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    partnerData: PartnerApplication | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    partnerData: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [partnerData, setPartnerData] = useState<PartnerApplication | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Skip auth if Supabase is not initialized (SSG build or missing config)
        if (!supabase) {
            setLoading(false);
            return;
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                fetchPartnerData(session.user.id);
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);

                if (session?.user) {
                    fetchPartnerData(session.user.id);
                } else {
                    setPartnerData(null);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const fetchPartnerData = async (uid: string) => {
        const result = await partnersApi.getApplication(uid);
        if (result.data) {
            setPartnerData(result.data);
        } else {
            setPartnerData(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, partnerData, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
