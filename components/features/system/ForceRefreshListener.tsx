"use client";

import { useEffect } from "react";
import { supabase } from "@/services/supabase/client";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "last_force_refresh_at";

export default function ForceRefreshListener() {
    const router = useRouter();

    useEffect(() => {
        if (!supabase) return;

        // 1. Initial check (optional, but good for returning users)
        // We generally rely on realtime, but initial fetch ensures we aren't stale on load
        const checkVersion = async () => {
            if (!supabase) return;
            const { data, error } = await supabase
                .from('system_config')
                .select('value')
                .eq('key', 'last_force_refresh_at')
                .single();

            if (data && !error) {
                handleRefreshCheck(data.value);
            }
        };

        checkVersion();

        // 2. Realtime subscription
        const channel = supabase
            .channel('force_refresh_channel')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'system_config',
                    filter: 'key=eq.last_force_refresh_at'
                },
                (payload) => {
                    const newValue = payload.new.value;
                    handleRefreshCheck(newValue);
                }
            )
            .subscribe();

        return () => {
            if (supabase) {
                supabase.removeChannel(channel);
            }
        };
    }, []);

    const handleRefreshCheck = (serverTimestamp: string) => {
        const localTimestamp = localStorage.getItem(STORAGE_KEY);

        // If local is empty, just set it (first visit or cleared)
        if (!localTimestamp) {
            localStorage.setItem(STORAGE_KEY, serverTimestamp);
            return;
        }

        // If server is newer/different than local, refresh
        // We use string comparison for simplicity as ISO strings compare correctly
        if (serverTimestamp !== localTimestamp) {
            console.log("New version detected, forcing refresh...");
            localStorage.setItem(STORAGE_KEY, serverTimestamp);
            window.location.reload();
        }
    };

    return null; // UUID component (invisible)
}
