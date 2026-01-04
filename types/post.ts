export type PostCategory = 'Training' | 'Pilates' | 'Breathing' | 'Digital Health' | 'Research' | 'Partner';

export interface PostFile {
    name: string;
    url: string;
    id?: string;
    resourceType?: 'image' | 'video' | 'raw';
}

export interface Post {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: PostCategory;
    date: string;
    image: string;
    files: PostFile[];
    createdAt: string;
    createdBy?: string;
}

export type PostFormData = Omit<Post, 'id' | 'createdAt' | 'createdBy'>;
