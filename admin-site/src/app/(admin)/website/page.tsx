'use client'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState, useEffect } from "react";

export default function Page() {
    const { data: PublicParentPages, isError, isLoading } = api.site.getAllPages.useQuery();
    const [selectedPage, setSelectedPage] = useState<string>("");
    const [formData, setFormData] = useState<{ [key: string]: string }>({}); // Data voor het formulier

    const { data: pageText, refetch } = api.site.getSiteText.useQuery(
        { pageId: selectedPage || "" },
        { enabled: !!selectedPage }
    );

    const updateSiteText = api.site.updateSiteText.useMutation({
        onSuccess: () => {
            alert('Tekst succesvol opgeslagen!');
            refetch(); // Herlaad de data na een succesvolle update
        },
        onError: (error) => {
            alert(`Er is een fout opgetreden: ${error.message}`);
        },
    });

    const handleSubmit = async (id: string) => {
        try {
            if (formData[id]) {
                await updateSiteText.mutateAsync({
                    id,                   // ID van de tekst die je wilt updaten
                    text: formData[id],    // De bijgewerkte tekst
                    pageId: selectedPage!, // Het id van de pagina die momenteel is geselecteerd
                });
            } else {
                alert('Geen tekst om op te slaan.');
            }
        } catch (error) {
            console.error('Fout bij opslaan:', error);
        }
    };

    // Wanneer de data van pageText verandert, stel de formData in
    useEffect(() => {
        if (pageText) {
            const newFormData: { [key: string]: string } = {};
            pageText.forEach((item) => {
                newFormData[item.id] = item.content;
            });
            setFormData(newFormData);
        }
    }, [pageText]);


    return (
        <div className="w-full h-full flex p-2">
            <div className="w-1/4 h-full flex flex-col justify-center">
                <ScrollArea className="w-full h-96 rounded-md">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Publieke site</AccordionTrigger>
                            <AccordionContent>
                                <div className="w-full h-full flex flex-col text-start items-start gap-2">
                                    {PublicParentPages?.map((PublicParentPage) => (
                                        PublicParentPage.PublicSubPages && PublicParentPage.PublicSubPages.length > 0 ? (
                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="item-2">
                                                    <AccordionTrigger className="text-sm">{PublicParentPage.title}</AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="w-full h-full flex flex-col gap-2 text-start items-start">
                                                            {PublicParentPage.PublicSubPages.map((PublicSubPage) => (
                                                                <button onClick={() => setSelectedPage(PublicSubPage.id)}>{PublicSubPage.title}</button>
                                                            ))}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        ) : (
                                            <button onClick={() => setSelectedPage(PublicParentPage.id)}>{PublicParentPage.title}</button>
                                        )
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </ScrollArea>
            </div>
            <div className="w-3/4 h-full flex flex-col p-4">
                <h1 className="text-2xl uppercase font-light">
                    {
                        selectedPage
                            ? (
                                PublicParentPages?.find(page => page.id === selectedPage)?.title ||
                                PublicParentPages?.flatMap(page => page.PublicSubPages || []).find(subPage => subPage.id === selectedPage)?.title ||
                                "Selecteer een pagina"
                            )
                            : "Selecteer een pagina"
                    }
                </h1>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error fetching page content</p>}
                {!isLoading && pageText && (
                    <div className="h-full w-full flex flex-col gap-4">
                        {pageText?.map((item) => (
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
