import { NextResponse } from 'next/server';

export async function GET() {
  const folderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

  if (!folderId || !apiKey) {
    return NextResponse.json(
      { error: 'Google Drive configuration missing' },
      { status: 500 }
    );
  }

  try {
    // Google Drive API를 사용하여 폴더 내 파일 목록 가져오기
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,webViewLink,webContentLink,size,modifiedTime)&orderBy=modifiedTime desc&key=${apiKey}`,
      {
        next: { revalidate: 300 } // 5분마다 캐시 갱신
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Google Drive API error:', errorData);
      throw new Error('Failed to fetch files');
    }

    const data = await response.json();
    return NextResponse.json(data.files || []);
  } catch (error) {
    console.error('Google Drive API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files from Google Drive' },
      { status: 500 }
    );
  }
}

