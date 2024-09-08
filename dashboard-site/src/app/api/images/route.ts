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

        // Stap 2: Gebruik de API Key om de bestanden op te halen
        const imagesResponse = await fetch('https://chibisafe.sandervddussen.nl/api/admin/files', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey, // Gebruik de verkregen API Key hier
            },
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
