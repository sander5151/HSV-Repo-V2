import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Stap 1: Log in om de API Key te verkrijgen
        const loginResponse = await fetch('https://chibisafe.sandervddussen.nl/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: process.env.CHIBISAFE_USERNAME, // Zet je gebruikersnaam in een .env variabele
                password: process.env.CHIBISAFE_PASSWORD, // Zet je wachtwoord in een .env variabele
            }),
        });

        if (!loginResponse.ok) {
            return NextResponse.json({ message: 'Error logging in' }, { status: loginResponse.status });
        }

        // Verkrijg de API Key vanuit de loginresponse
        const loginData = await loginResponse.json();
        const apiKey = loginData.user.apiKey; // Haal de API Key uit de response

        // Stap 2: Haal de albums op met de API Key
        const albumsResponse = await fetch('https://chibisafe.sandervddussen.nl/api/albums', {
            method: 'GET',
            headers: {
                'X-API-Key': apiKey, // Gebruik de verkregen API Key
            },
        });

        if (!albumsResponse.ok) {
            return NextResponse.json({ message: 'Error fetching albums' }, { status: albumsResponse.status });
        }

        const albumsData = await albumsResponse.json();

        // Stap 3: Stuur de albums terug naar de frontend
        return NextResponse.json(albumsData, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}