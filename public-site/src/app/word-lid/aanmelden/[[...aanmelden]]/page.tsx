import { SignUp } from "@clerk/nextjs"

export default function page() {
    return <SignUp path="/word-lid/aanmelden" forceRedirectUrl="https://public.sandervddussen.nl/word-lid/profiel" />
}
