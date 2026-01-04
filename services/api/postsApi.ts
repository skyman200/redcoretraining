import { db } from "../firebase/client";
import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    orderBy,
    deleteDoc,
    serverTimestamp,
    Timestamp
} from "firebase/firestore";
import { Post, PostFormData, PostCategory } from "@/types/post";
import { ApiResult } from "@/types/api";

const COLLECTION_NAME = "posts";

export const postsApi = {
    async create(data: PostFormData): Promise<ApiResult<Post>> {
        try {
            const id = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-가-힣]/g, '');
            const post: Post = {
                ...data,
                id,
                createdAt: new Date().toISOString(),
            };

            await setDoc(doc(db, COLLECTION_NAME, id), {
                ...post,
                createdAt: serverTimestamp(),
            });

            return { data: post, error: null };
        } catch (error) {
            console.error("Error creating post:", error);
            return { error: error as Error };
        }
    },

    async getAll(): Promise<ApiResult<Post[]>> {
        try {
            const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            const posts: Post[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                posts.push({
                    ...data,
                    id: doc.id,
                    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
                } as Post);
            });

            return { data: posts, error: null };
        } catch (error) {
            console.error("Error fetching posts:", error);
            return { error: error as Error };
        }
    },

    async getByCategory(category: PostCategory): Promise<ApiResult<Post[]>> {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("category", "==", category),
                orderBy("date", "desc")
            );
            const querySnapshot = await getDocs(q);
            const posts: Post[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                posts.push({
                    ...data,
                    id: doc.id,
                    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
                } as Post);
            });

            return { data: posts, error: null };
        } catch (error) {
            console.error(`Error fetching posts for category ${category}:`, error);
            return { error: error as Error };
        }
    },

    async getById(id: string): Promise<ApiResult<Post>> {
        try {
            const docSnap = await getDoc(doc(db, COLLECTION_NAME, id));
            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    data: {
                        ...data,
                        id: docSnap.id,
                        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
                    } as Post,
                    error: null
                };
            }
            return { error: new Error("Post not found") };
        } catch (error) {
            console.error("Error fetching post by ID:", error);
            return { error: error as Error };
        }
    },

    async delete(id: string): Promise<ApiResult<void>> {
        try {
            await deleteDoc(doc(db, COLLECTION_NAME, id));
            return { data: undefined, error: null };
        } catch (error) {
            console.error("Error deleting post:", error);
            return { error: error as Error };
        }
    }
};
