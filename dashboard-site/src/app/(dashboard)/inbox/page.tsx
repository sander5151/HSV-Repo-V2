import { api } from "@/trpc/server"
import { auth } from "@clerk/nextjs/server"

export default async function InboxPage() {
    const { userId } = auth()
    const usersInbox = await api.inbox.getUsersInbox({ clerkId: userId ?? "" })
    return (
        <div className="w-full h-full flex p-4">
            <div className="w-1/2 h-full flex flex-col">
                <h1>Inbox</h1>
                {usersInbox.map((message) => (
                    <div key={message.id}>
                        <h2>{message.subject}</h2>
                        <p>{message.body}</p>
                    </div>
                ))}
            </div>
            <div className="w-1/2 h-full flex flex-col">
                <h1>Send</h1>
            </div>
        </div>
    )
}
