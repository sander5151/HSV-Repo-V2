import { api } from "@/trpc/server"
import { auth } from "@clerk/nextjs/server"

export default async function MijnHSVProfielPage() {
    const { userId } = auth()
    const getUserInfo = userId ? await api.user.getUserInfo({ clerkId: userId }) : null;

    return (
        <div className="w-full h-full flex p-4">
            <div className="w-1/2 h-full flex flex-col">
                <h1>Profiel</h1>
                {getUserInfo ? (
                    <div>
                        <h2>{getUserInfo.firstName}</h2>
                        <p>{getUserInfo.email}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="w-1/2 h-full flex flex-col">
                <h1>Send</h1>
            </div>
        </div>
    )
}
