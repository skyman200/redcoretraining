import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { postsApi } from '@/services/api/postsApi';
import { PostFormData, PostFile } from '@/types/post';

export function useNewPost() {
    const router = useRouter();
    const [formData, setFormData] = useState<PostFormData>({
        title: '',
        excerpt: '',
        content: '',
        category: 'Training',
        date: new Date().toISOString().split('T')[0],
        image: '/hero.jpg',
        files: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [newFileUrl, setNewFileUrl] = useState('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }, []);

    const handleFileUpload = useCallback((file: { name: string; downloadLink: string; id: string; resourceType: any }) => {
        setFormData(prev => ({
            ...prev,
            files: [...prev.files, {
                name: file.name,
                url: file.downloadLink,
                id: file.id,
                resourceType: file.resourceType
            }]
        }));
    }, []);

    const handleAddFile = useCallback(() => {
        if (newFileName && newFileUrl) {
            setFormData(prev => ({
                ...prev,
                files: [...prev.files, { name: newFileName, url: newFileUrl }]
            }));
            setNewFileName('');
            setNewFileUrl('');
        }
    }, [newFileName, newFileUrl]);

    const handleRemoveFile = useCallback((index: number) => {
        setFormData(prev => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index)
        }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await postsApi.create(formData);

        if (result.error) {
            alert('Failed to save post: ' + result.error.message);
            setIsSubmitting(false);
        } else {
            router.push('/admin/dashboard');
        }
    }, [formData, router]);

    return {
        formData,
        isSubmitting,
        newFileName,
        newFileUrl,
        setNewFileName,
        setNewFileUrl,
        handleChange,
        handleFileUpload,
        handleAddFile,
        handleRemoveFile,
        handleSubmit
    };
}
