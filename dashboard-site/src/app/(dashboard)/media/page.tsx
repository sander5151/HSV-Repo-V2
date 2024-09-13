'use client';

import { useEffect, useState } from 'react';

type Album = {
    id: string;
    name: string;
    files: string[];
};

export default function Albums() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await fetch('/api/images/album'); // Roep de Next.js API aan
                if (!res.ok) {
                    throw new Error('Error fetching albums');
                }
                const data = await res.json();
                console.log('API Response:', data); // Log de API-respons
                setAlbums(data); // Zet de data in de state
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
        <div>
            <h1>Albums</h1>
            <ul>
                {Array.isArray(albums) && albums.length > 0 ? (
                    albums.map((album) => (
                        <li key={album.id}>
                            <h2>{album.name}</h2>
                            <p>{album.files.length} files</p>
                        </li>
                    ))
                ) : (
                    <p>No albums available</p>
                )}
            </ul>
        </div>
    );
}


// 'use client';

// import { useEffect, useState } from 'react';

// type Image = {
//     name: string;
//     url: string;
//     thumb: string;
//     createdAt: string;
// };

// export default function MediaPage() {
//     const [images, setImages] = useState<Image[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [file, setFile] = useState<File | null>(null);
//     const [message, setMessage] = useState<string | null>(null);

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setFile(e.target.files[0]);
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             setMessage('No file selected');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const res = await fetch('/api/images/upload', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (!res.ok) {
//                 throw new Error('Error uploading file');
//             }

//             const data = await res.json();
//             setMessage(`File uploaded successfully: ${data.url}`);
//         } catch (err) {
//             setMessage((err as Error).message);
//         }
//     };

//     useEffect(() => {
//         const fetchImages = async () => {
//             try {
//                 const res = await fetch('/api/images'); // Roep de Next.js API aan
//                 if (!res.ok) {
//                     throw new Error('Error fetching images');
//                 }
//                 const data: Image[] = await res.json();
//                 setImages(data);
//             } catch (err) {
//                 setError((err as Error).message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchImages();
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className='w-full h-full flex p-4'>
//             <div className='w-1/2 h-full flex flex-col items-center'>
//                 <h1>Image Gallery</h1>
//                 <ul>
//                     {images.map((image) => (
//                         <li key={image.name}>
//                             <img src={image.thumb || image.url} alt={image.name} width="200" />
//                             <p>{image.name}</p>
//                             <p>Uploaded on: {new Date(image.createdAt).toLocaleDateString()}</p>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className='w-1/2 h-full flex flex-col items-center'>
//                 <h1>Upload a File</h1>
//                 <input type="file" onChange={handleFileChange} />
//                 <button onClick={handleUpload}>Upload</button>
//                 {message && <p>{message}</p>}
//             </div>
//         </div>
//     );
// }
