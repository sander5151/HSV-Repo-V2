import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/trpc/server"
import { EllipsisVertical, Link } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default async function Page() {
    const data = await api.user.getAllMembers();

    return (
        <div className="w-full h-full flex p-4 flex-col">
            <h1>Leden</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Foto</TableHead>
                        <TableHead>Voornaam</TableHead>
                        <TableHead>Achternaam</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Meer...</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell>
                                <img src={member.image ?? ''} alt={member.firstName} className="w-10 h-10 rounded-full" />
                            </TableCell>
                            <TableCell>{member.firstName}</TableCell>
                            <TableCell>{member.lastName}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>
                                <Sheet>
                                    <SheetTrigger>
                                        <EllipsisVertical className="text-orange-400" />
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle>{member.firstName} {member.lastName}</SheetTitle>
                                            </SheetHeader>
                                        </SheetContent>
                                    </SheetTrigger>
                                </Sheet>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
