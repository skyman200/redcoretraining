import { NextResponse } from 'next/server';
import crypto from 'crypto';

const CLOUD_NAME = 'dh9eykeo2';
const API_KEY = '714146237553461';
const API_SECRET = '8D2ABTvD7tPwL93u5KTx9Qz_wq4';

export async function POST(request: Request) {
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
