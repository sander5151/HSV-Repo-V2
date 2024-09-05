import { currentUser } from "@clerk/nextjs/server";
import CreateUserForm from "./components/createUserForm";
import { redirect } from "next/navigation";
export default async function Page() {
    const user = await currentUser()

    if (!user) {
        redirect("/word-lid")
    }

    return (
        <div className='w-full h-full flex flex-col'>
            <CreateUserForm imageUrl={user?.imageUrl || ''} />
        </div>
    );
}
