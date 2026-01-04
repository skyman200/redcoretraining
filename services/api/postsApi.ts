import { supabase } from "../supabase/client";
import { Post, PostFormData, PostCategory } from "@/types/post";
import { ApiResult } from "@/types/api";

const TABLE_NAME = "posts";

export const postsApi = {
    async create(data: PostFormData): Promise<ApiResult<Post>> {
        if (!supabase) {
            return { error: new Error("Supabase not initialized") };
        }
        try {
            const id = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-가-힣]/g, '');
            const post: Post = {
                ...data,
                id,
                createdAt: new Date().toISOString(),
            };

            const { error } = await supabase
                .from(TABLE_NAME)
                .upsert({
                    id,
                    title: data.title,
                    excerpt: data.excerpt,
                    content: data.content,
                    category: data.category,
                    date: data.date,
                    image: data.image,
                    files: data.files,
                });

            if (error) throw error;
            return { data: post, error: null };
        } catch (error) {
            console.error("Error creating post:", error);
            return { error: error as Error };
        }
    },

    async getAll(): Promise<ApiResult<Post[]>> {
        if (!supabase) {
            return { data: [], error: null };
        }
        try {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;

            const posts: Post[] = (data || []).map(row => ({
                id: row.id,
                title: row.title,
                excerpt: row.excerpt,
                content: row.content,
                category: row.category as PostCategory,
                date: row.date,
                image: row.image,
                files: row.files || [],
                createdAt: row.created_at,
            }));

            return { data: posts, error: null };
        } catch (error) {
            console.error("Error fetching posts:", error);
            return { error: error as Error };
        }
    },

    async getByCategory(category: PostCategory): Promise<ApiResult<Post[]>> {
        if (!supabase) {
            return { data: [], error: null };
        }
        try {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .select('*')
                .eq('category', category)
                .order('date', { ascending: false });

            if (error) throw error;

            const posts: Post[] = (data || []).map(row => ({
                id: row.id,
                title: row.title,
                excerpt: row.excerpt,
                content: row.content,
                category: row.category as PostCategory,
                date: row.date,
                image: row.image,
                files: row.files || [],
                createdAt: row.created_at,
            }));

            return { data: posts, error: null };
        } catch (error) {
            console.error(`Error fetching posts for category ${category}:`, error);
            return { error: error as Error };
        }
    },

    async getById(id: string): Promise<ApiResult<Post>> {
        if (!supabase) {
            return { error: new Error("Supabase not initialized") };
        }
        try {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (!data) return { error: new Error("Post not found") };

            return {
                data: {
                    id: data.id,
                    title: data.title,
                    excerpt: data.excerpt,
                    content: data.content,
                    category: data.category as PostCategory,
                    date: data.date,
                    image: data.image,
                    files: data.files || [],
                    createdAt: data.created_at,
                },
                error: null
            };
        } catch (error) {
            console.error("Error fetching post by ID:", error);
            return { error: error as Error };
        }
    },

    async delete(id: string): Promise<ApiResult<void>> {
        if (!supabase) {
            return { error: new Error("Supabase not initialized") };
        }
        try {
            const { error } = await supabase
                .from(TABLE_NAME)
                .delete()
                .eq('id', id);

            if (error) throw error;
            return { data: undefined, error: null };
        } catch (error) {
            console.error("Error deleting post:", error);
            return { error: error as Error };
        }
    }
};
