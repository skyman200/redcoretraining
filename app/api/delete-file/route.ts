import { NextResponse } from 'next/server';
import crypto from 'crypto';

const CLOUD_NAME = 'dh9eykeo2';
const API_KEY = '714146237553461';
const API_SECRET = '8D2ABTvD7tPwL93u5KTx9Qz_wq4';

export async function POST(request: Request) {
    try {
        const { public_id, resource_type } = await request.json();

        if (!public_id) {
            return NextResponse.json({ error: 'Missing public_id' }, { status: 400 });
        }

        // Default to 'image' if not specified, but usually we should pass it
        const type = resource_type || 'image';

        const timestamp = Math.round((new Date()).getTime() / 1000);

        // Generate Signature
        // String to sign: "public_id=...&timestamp=..." + api_secret
        // Parameters must be sorted alphabetically
        const paramsToSign = `public_id=${public_id}&timestamp=${timestamp}`;
        const signature = crypto
            .createHash('sha1')
            .update(paramsToSign + API_SECRET)
            .digest('hex');

        const formData = new FormData();
        formData.append('public_id', public_id);
        formData.append('api_key', API_KEY);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);

        // URL depends on resource type
        const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/destroy`;

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.result === 'ok' || data.result === 'not found') {
            return NextResponse.json({ success: true, result: data.result });
        } else {
            console.error('Cloudinary deletion failed:', data);
            return NextResponse.json({ error: 'Deletion failed', details: data }, { status: 500 });
        }

    } catch (error) {
        console.error('Server error during file deletion:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
