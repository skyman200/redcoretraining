import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

// Configure Google Drive API
const getDriveClient = (accessToken?: string) => {
    if (accessToken) {
        // Use OAuth token (user's personal drive)
        const auth = new google.auth.OAuth2();
        auth.setCredentials({ access_token: accessToken });
        return google.drive({ version: 'v3', auth });
    } else {
        // Use service account (for shared drives)
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });
        return google.drive({ version: 'v3', auth });
    }
};

export async function POST(request: NextRequest) {
    try {
        // Check if environment variables are set
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_DRIVE_FOLDER_ID) {
            return NextResponse.json(
                { error: 'Google Drive API credentials not configured. Please set up environment variables.' },
                { status: 500 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const accessToken = formData.get('access_token') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Check credentials
        if (!accessToken && (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY)) {
            return NextResponse.json(
                { error: 'Google Drive API credentials not configured. Please authorize with Google or set up service account.' },
                { status: 500 }
            );
        }

        // Convert File to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a readable stream from the buffer
        const stream = Readable.from(buffer);

        // Upload to Google Drive
        const drive = getDriveClient(accessToken || undefined);

        const fileMetadata: any = {
            name: file.name,
        };

        // Only set parents if using service account with folder
        if (!accessToken && process.env.GOOGLE_DRIVE_FOLDER_ID) {
            fileMetadata.parents = [process.env.GOOGLE_DRIVE_FOLDER_ID];
        }

        const media = {
            mimeType: file.type,
            body: stream,
        };

        const createParams: any = {
            requestBody: fileMetadata,
            media: media,
            fields: 'id, name, webViewLink, webContentLink',
        };

        // Only use supportsAllDrives for service account with shared drives
        if (!accessToken) {
            createParams.supportsAllDrives = true;
        }

        const response = await drive.files.create(createParams);

        // Make the file publicly accessible
        const permissionsParams: any = {
            fileId: response.data.id!,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        };

        if (!accessToken) {
            permissionsParams.supportsAllDrives = true;
        }

        await drive.permissions.create(permissionsParams);

        // Get the file with updated permissions
        const getParams: any = {
            fileId: response.data.id!,
            fields: 'id, name, webViewLink, webContentLink',
        };

        if (!accessToken) {
            getParams.supportsAllDrives = true;
        }

        const fileData = await drive.files.get(getParams);

        return NextResponse.json({
            success: true,
            file: {
                id: fileData.data.id,
                name: fileData.data.name,
                url: fileData.data.webContentLink || fileData.data.webViewLink,
                viewLink: fileData.data.webViewLink,
                downloadLink: fileData.data.webContentLink,
            },
        });
    } catch (error) {
        console.error('Error uploading to Google Drive:', error);
        return NextResponse.json(
            { error: 'Failed to upload file to Google Drive', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// Note: Next.js App Router doesn't support body size limits in route handlers
// For production deployment on Vercel, the default limit is 4.5MB
// For larger files, consider using:
// 1. Vercel Pro plan (increases limit to 100MB)
// 2. Direct client-to-Google Drive upload using Google Picker API
// 3. Chunked upload implementation
export const maxDuration = 300; // 5 minutes timeout for large uploads
