import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Stap 2: Gebruik de API Key om de bestanden op te halen
        const imagesResponse = await fetch('https://chibisafe.sandervddussen.nl/api/albums', {
            method: 'GET',
        });

        if (!imagesResponse.ok) {
            return NextResponse.json({ message: 'Error fetching images' }, { status: imagesResponse.status });
        }

        const imagesData = await imagesResponse.json();

        // Stuur de opgehaalde bestanden terug naar de frontend
        return NextResponse.json(imagesData.files, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
