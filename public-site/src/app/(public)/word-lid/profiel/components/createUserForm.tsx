"use client"
import { useState } from "react";
import { useAuth } from '@clerk/nextjs'
import { api } from "@/trpc/react";

export default function CreateUserForm({
    imageUrl }: { imageUrl: string }
) {
    const utils = api.useUtils();
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(imageUrl);
    const [gender, setGender] = useState<string | undefined>(undefined);
    const [bio, setBio] = useState<string | undefined>(undefined);
    const [phone, setPhone] = useState<string | undefined>(undefined);
    const [country, setCountry] = useState<string | undefined>(undefined);
    const [province, setProvince] = useState<string | undefined>(undefined);
    const [city, setCity] = useState<string | undefined>(undefined);
    const [streetName, setStreetName] = useState<string | undefined>(undefined);
    const [houseNumber, setHouseNumber] = useState<string | undefined>(undefined);
    const [postalCode, setPostalCode] = useState<string | undefined>(undefined);
    const [study, setStudy] = useState<string | undefined>(undefined);
    const [Bedrag, setBedrag] = useState('');

    const createUserAccount = api.user.createUserAccount.useMutation({
        onSuccess: async () => {
            await utils.user.invalidate();
            setFirstName("");
            setLastName("");
            setEmail("");
            setImage("");
            setGender("");
            setBio("");
            setPhone("");
            setCountry("");
            setProvince("");
            setCity("");
            setStreetName("");
            setHouseNumber("");
            setPostalCode("");
            setStudy("");
            window.location.href = `/word-lid/betalen?bedrag=${Bedrag}`;
        }
    });

    return (
        <div className='w-full h-full flex flex-col'>
            <h1 className="text-2xl font-bold">Complete Profile</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                createUserAccount.mutate({
                    clerkId: userId ?? "",
                    firstName,
                    lastName,
                    email,
                    image,
                    gender,
                    bio,
                    phone,
                    country,
                    province,
                    city,
                    streetName,
                    houseNumber,
                    postalCode,
                    study,
                    profileCompleted: true,
                });
            }}>
                <div className="w-full flex flex-col gap-2 p-8">
                    <div className="w-full flex items-center gap-4">
                        <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="firstname" className="w-1/2" />
                        <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="lastname" className="w-1/2" />
                    </div>
                    <div className="w-full flex items-center gap-4">
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" className="w-1/2" />
                        <input type='text' value={image} onChange={(e) => setImage(e.target.value)} placeholder="image" className="w-1/2" />

                    </div>
                    <div className="w-full flex items-center gap-4">
                        <input type='text' value={gender} onChange={(e) => setGender(e.target.value)} placeholder="gender" className="w-1/2" />
                        <input type='text' value={bio} onChange={(e) => setBio(e.target.value)} placeholder="bio" className="w-1/2" />
                    </div>
                    <div className="w-full flex items-center gap-4">
                        <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="phone" className="w-1/2" />
                        <input type='text' value={country} onChange={(e) => setCountry(e.target.value)} placeholder="country" className="w-1/2" />

                    </div>
                    <div className="w-full flex items-center gap-4">
                        <input type='text' value={province} onChange={(e) => setProvince(e.target.value)} placeholder="province" className="w-1/2" />
                        <input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder="city" className="w-1/2" />

                    </div>
                    <div className="w-full flex items-center gap-4">
                        <input type='text' value={streetName} onChange={(e) => setStreetName(e.target.value)} placeholder="streetname" className="w-1/2" />
                        <input type='text' value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} placeholder="houseNumber" className="w-1/2" />

                    </div>
                    <div className="w-full flex items-center gap-4">
                        <input type='text' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="postalcode" className="w-1/2" />
                        <input type='text' value={study} onChange={(e) => setStudy(e.target.value)} placeholder="study" className="w-1/2" />
                    </div>
                    <div className="w-full flex items-center gap-4">
                        <input type='text' value={Bedrag} onChange={(e) => setBedrag(e.target.value)} placeholder="5" className="w-1/2" />
                    </div>
                    <button type='submit' className='w-full py-4 bg-blue-500 text-white rounded-3xl'>Maken</button>
                </div>

            </form>
        </div>
    );
}
