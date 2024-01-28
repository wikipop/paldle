import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "./ui/command"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "./ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {pal} from "../types/pal.d.tsx";

type Props = {
    actualPal: pal | null;
    setGuesses: Dispatch<SetStateAction<pal[] | []>>;
    guesses: pal[] | [];
}

const BASE_URL = import.meta.env.VITE_API_URL;

const FormSchema = z.object({
    language: z.string({
        required_error: "Please select a pal.",
    }),
})

export function ComboboxForm({actualPal, setGuesses, guesses}: Props) {
    const [possiblePals, setPossiblePals] = useState<{Pal: string}[]>([]);

    useEffect(() => {
        //TODO: REMOVE CONSOLE.LOG
        console.log(BASE_URL)
        fetch(`${BASE_URL}/palList`).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        }).then((data) => {
            console.log(data)
            setPossiblePals(data);
        })
    },[])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="inline-flex gap-2 mb-4">
                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? possiblePals.find(
                                                    (language) => language.Pal === field.value
                                                )?.Pal
                                                : "Select language"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search framework..."
                                            className="h-9"
                                        />
                                        <CommandEmpty>No framework found.</CommandEmpty>
                                        <CommandGroup>
                                            {possiblePals.map((palObject) => (
                                                <CommandItem
                                                    value={palObject.Pal}
                                                    key={palObject.Pal}
                                                    onSelect={() => {
                                                        form.setValue("language", palObject.Pal)
                                                    }}
                                                >
                                                    {palObject.Pal}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            palObject.Pal === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
