"use client"

import { useEffect, useState } from "react";

type Image = {
    name: string;
    url: string;
    thumb: string;
    createdAt: string;
};
export default function imagesOverview() {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/images'); // Roep de Next.js API aan
                if (!res.ok) {
                    throw new Error('Error fetching images');
                }
                const data: Image[] = await res.json();
                setImages(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>

        </div>
    )
}
