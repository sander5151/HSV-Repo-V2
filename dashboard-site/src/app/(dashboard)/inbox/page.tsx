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
                    <div key={message.id} className="w-full flex justify-between">
                        <h2 className="w-1/3">{message.subject}</h2>
                        <p className="w-2/3 text-start">{message.body}</p>
                    </div>
                ))}
            </div>
            <div className="w-1/2 h-full flex flex-col">
                <h1>Send</h1>
            </div>
        </div>
    )
}
