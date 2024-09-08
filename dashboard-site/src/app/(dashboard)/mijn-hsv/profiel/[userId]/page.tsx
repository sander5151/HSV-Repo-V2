import { api } from "@/trpc/server";

export default async function MijnHSVProfilePublic({ params }: { params: { userId: string } }) {
    const userInfoById = await api.user.getUserInfoById({ id: params.userId });

    if (!userInfoById) {
        return (
            <div>Gebruiker niet gevonden</div>
        );
    }

    return (
        <div>{userInfoById.firstName}</div>
    );
}