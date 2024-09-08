'use client'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState, useEffect } from "react";

export default function Page() {
    const PublicPages = api.site.getAllPages.useQuery();
    const [selectedPage, setSelectedPage] = useState < string | null > (null);
    const [formData, setFormData] = useState < { [key: string]: string } > ({}); // Data voor het formulier

    console.log(PublicPages);

    return (
        <div className="w-full h-full flex p-2">
            <div className="w-1/4 h-full flex flex-col justify-center">
                <ScrollArea className="w-full h-96 rounded-md">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Publieke site</AccordionTrigger>
                            <AccordionContent>
                                <div className="w-full h-full flex flex-col text-start items-start gap-2">
                                    <button onClick={() => setSelectedPage("Homepage")}>Homepage</button>
                                    <button onClick={() => setSelectedPage("Agenda")}>Agenda</button>
                                    <button onClick={() => setSelectedPage("Contact")}>Contact</button>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Over HSV</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="w-full h-full flex flex-col gap-2 text-start items-start">
                                                    <button onClick={() => setSelectedPage("Over-hsv")}>Over HSV</button>
                                                    <button onClick={() => setSelectedPage("Bestuur")}>Bestuur</button>
                                                    <button onClick={() => setSelectedPage("Fractie")}>Fractie</button>
                                                    <button onClick={() => setSelectedPage("Commissies")}>Commissies</button>
                                                    <button onClick={() => setSelectedPage("Werkgroepen")}>Werkgroepen</button>
                                                    <button onClick={() => setSelectedPage("Geschiedenis")}>Geschiedenis</button>
                                                    <button onClick={() => setSelectedPage("Verenigingsdocumenten")}>Verenigingsdocumenten</button>
                                                    <button onClick={() => setSelectedPage("Vertrouwenspersoon")}>Vertrouwenspersoon</button>
                                                    <button onClick={() => setSelectedPage("Raad van Toezicht")}>Raad van Toezicht</button>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    <button onClick={() => setSelectedPage("Standpunten")}>Standpunten</button>
                                    <button onClick={() => setSelectedPage("Lid-worden")}>Lid worden</button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Dashboard site</AccordionTrigger>
                            <AccordionContent>
                                <div className="w-full h-full flex flex-col gap-1">
                                    <button onClick={() => setSelectedPage("Homepage")}>Homepage</button>
                                    <button onClick={() => setSelectedPage("Agenda")}>Agenda</button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </ScrollArea>
            </div>
            <div className="w-3/4 h-full flex flex-col p-4">
                <h1 className="text-2xl uppercase font-light">{selectedPage ? selectedPage.replace("-", " ") : "Selecteer een pagina"}</h1>

                {/* Resultaat van de query */}
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error fetching page content</p>}
                {!isLoading && pageText && (
                    <div className="h-full w-full flex flex-col gap-4">
                        {pageText.map((item) => (
                            <div key={item.id} className="flex flex-col gap-2">
                                <Textarea
                                    value={formData[item.id] || ""}
                                    onChange={(e) => setFormData({ ...formData, [item.id]: e.target.value })}
                                    className="h-32 w-full"
                                />
                                <Button onClick={() => handleSubmit(item.id)} className="self-end">
                                    Opslaan
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
