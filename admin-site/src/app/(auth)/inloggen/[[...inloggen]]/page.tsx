import { SignIn } from "@clerk/nextjs"

export default function page() {
    return (
        <div>
            <SignIn path="/inloggen" />
        </div>
    )
}
