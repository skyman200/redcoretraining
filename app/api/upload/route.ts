import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

// Configure Google Drive API
const getDriveClient = () => {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    return google.drive({ version: 'v3', auth });
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

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Check file size (300MB limit)
        const maxSize = 300 * 1024 * 1024; // 300MB in bytes
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size exceeds 300MB limit' },
                { status: 400 }
            );
        }

        // Convert File to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a readable stream from the buffer
        const stream = Readable.from(buffer);

        // Upload to Google Drive
        const drive = getDriveClient();

        const fileMetadata = {
            name: file.name,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
        };

        const media = {
            mimeType: file.type,
            body: stream,
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id, name, webViewLink, webContentLink',
        });

        // Make the file publicly accessible
        await drive.permissions.create({
            fileId: response.data.id!,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Get the file with updated permissions
        const fileData = await drive.files.get({
            fileId: response.data.id!,
            fields: 'id, name, webViewLink, webContentLink',
        });

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
