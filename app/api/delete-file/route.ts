import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Use environment variables for security
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

export async function POST(request: Request) {
    // Validate environment variables
    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
        console.error('Cloudinary credentials not configured');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
        const { public_id, resource_type } = await request.json();

        if (!public_id) {
            return NextResponse.json({ error: 'Missing public_id' }, { status: 400 });
        }

        const type = resource_type || 'image';
        const timestamp = Math.round((new Date()).getTime() / 1000);

        // Generate Signature
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
            return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
        }

    } catch (error) {
        console.error('Server error during file deletion:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
