import { NextResponse } from 'next/server';

export async function POST(req: Request) {
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

        // Stap 2: Lees het bestand van de request
        const formData = await req.formData();
        const file = formData.get('file'); // Het bestand dat geüpload wordt

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        // Stap 3: Upload het bestand naar de externe API
        const uploadResponse = await fetch('https://chibisafe.sandervddussen.nl/api/upload', {
            method: 'POST',
            headers: {
                'X-API-Key': apiKey, // Gebruik de verkregen API Key
            },
            body: formData, // Stuur het bestand mee als form-data
        });

        if (!uploadResponse.ok) {
            return NextResponse.json({ message: 'Error uploading file' }, { status: uploadResponse.status });
        }

        const uploadData = await uploadResponse.json();

        // Stap 4: Stuur de respons terug naar de frontend
        return NextResponse.json(uploadData, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}