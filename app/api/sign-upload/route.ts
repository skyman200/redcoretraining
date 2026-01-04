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
        const body = await request.json();
        const { paramsToSign } = body;

        if (!paramsToSign) {
            return NextResponse.json({ error: 'Missing paramsToSign' }, { status: 400 });
        }

        const signature = crypto
            .createHash('sha1')
            .update(paramsToSign + API_SECRET)
            .digest('hex');

        return NextResponse.json({
            signature,
            apiKey: API_KEY,
            cloudName: CLOUD_NAME
        });
    } catch (error) {
        console.error('Error generating signature:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
