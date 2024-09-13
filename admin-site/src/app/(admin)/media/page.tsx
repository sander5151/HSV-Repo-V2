'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Album = {
    uuid: string;
    name: string;
    description: string | null;
    nsfw: boolean;
    zippedAt: string | null;
    createdAt: string;
    editedAt: string;
    cover: string;
    count: number;
};

export default function MediaPage() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/images/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Error uploading file');
            }

            const data = await res.json();
            setMessage(`File uploaded successfully: ${data.url}`);
        } catch (err) {
            setMessage((err as Error).message);
        }
    };

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await fetch('/api/images/alb'); // Roep de Next.js API aan
                if (!res.ok) {
                    throw new Error('Error fetching albums');
                }
                const data = await res.json();
                setAlbums(data.albums); // Verwerk de albums
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='w-full h-full flex p-4'>
            {/* Album weergave */}
            <div className='w-3/4 h-full flex flex-col items-center'>
                <h1>Album Gallery</h1>
                <div className="grid grid-cols-3 gap-4">
                    {albums.map((album) => (
                        <div key={album.uuid} className="border p-4">
                            <Image
                                src={album.cover}
                                alt={album.name}
                                width={150}
                                height={150}
                                className="rounded"
                            />
                            <h2 className="text-lg font-semibold">{album.name}</h2>
                            <p>{album.description || "No description available"}</p>
                            <p>{album.count} images</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upload sectie */}
            <div className='w-1/4 h-full flex flex-col items-center'>
                <h1>Upload a File</h1>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}
