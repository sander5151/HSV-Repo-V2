import { api } from "@/trpc/server"
import { auth } from "@clerk/nextjs/server"

export default async function TodoPage() {
    const { userId } = auth()
    const todos = await api.calendar.getUsersTodos({ clerkId: userId as string })
    return (
        <div className="w-full h-full flex p-4">
            <div className="w-1/2 h-full flex flex-col">
                {todos.map(todo => (
                    <div key={todo.id}>
                        {todo.subject}
                    </div>
                ))}
            </div>
            <div className="w-1/2 h-full flex flex-col">
            </div>
        </div>
    )
}
