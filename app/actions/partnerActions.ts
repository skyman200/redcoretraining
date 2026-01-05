'use server';

import { getAdminSupabase } from '@/services/supabase/admin';
import { PartnerApplication } from '@/types/partner';
import { revalidatePath } from 'next/cache';

export async function deletePartnerAction(uid: string) {
    try {
        console.log(`[Admin Action] Attempting to delete partner: ${uid}`);
        const supabase = getAdminSupabase();

        // 1. Delete from partner_applications
        const { error: appError } = await supabase
            .from('partner_applications')
            .delete()
            .eq('uid', uid);

        if (appError) throw appError;

        // 2. Also delete from partners table if exists (legacy/sync)
        // Ignoring error here as it might not exist
        await supabase.from('partners').delete().eq('partnerId', uid);

        revalidatePath('/admin/partners');
        return { success: true };
    } catch (error) {
        console.error('Delete partner error:', error);
        return { success: false, error: (error as Error).message };
    }
}

export async function updatePartnerStatusAction(uid: string, status: PartnerApplication['status']) {
    try {
        const supabase = getAdminSupabase();

        const { error } = await supabase
            .from('partner_applications')
            .update({ status })
            .eq('uid', uid);

        if (error) throw error;

        revalidatePath('/admin/partners');
        return { success: true };
    } catch (error) {
        console.error('Update status error:', error);
        return { success: false, error: (error as Error).message };
    }
}
