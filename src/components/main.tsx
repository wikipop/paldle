import {ReactNode, useEffect, useState} from "react";
import type {pal} from "../types/pal.d.tsx";
import {ComboboxForm} from "./searchForm.tsx";
import {z} from "zod";
import FormSchema from "../types/formSchema.tsx";
import ElementIcon from "./elementIcon.tsx";
import {ArrowDownIcon, ArrowUpIcon} from "@radix-ui/react-icons";

const BASE_URL = import.meta.env.VITE_API_URL;

async function getPalByName(name: string): Promise<pal> {
    const response = await fetch(`${BASE_URL}/Pal=${name}`)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json();
}

async function getRandomPal(): Promise<string> {
    const response = await fetch(`${BASE_URL}/randomPal`)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json();
}

function Main() {
    const [guessedPals, setGuessedPals] = useState<pal[] | []>([]);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [actualPal, setActualPal] = useState<pal | null>(null);
    const [won, setWon] = useState<boolean>(false);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const guessedPalName = data.pal;
        if(guesses.includes(guessedPalName)) {
            alert("You already guessed that pal!")
            return;
        }

        setGuesses([...guesses, guessedPalName])
        getPalByName(guessedPalName).then((pal) => {
            setGuessedPals([...guessedPals, pal])
            console.log(pal)
        })

        if (guessedPalName === actualPal?.Paldeck.PalName) {
            setWon(true)
        }

    }

    useEffect(() => {
        getRandomPal().then((palName) => {
            getPalByName(palName).then((pal) => setActualPal(pal))
        })
    }, [])

    function Guess({data}: {data: pal}) {
        return (
            <>
                <TCell>
                    {data.Paldeck.PalName}
                </TCell>
                    <EvaluatedCell data1={Number(data.Paldeck.PaldeckNumber.slice(1))} data2={Number(actualPal!.Paldeck.PaldeckNumber.slice(1))}>
                        {data.Paldeck.PaldeckNumber}
                    </EvaluatedCell>

                    {data.Elements.Element1 === actualPal!.Elements.Element1 ?
                        <GoodCell><ElementIcon element={data.Elements.Element1}/></GoodCell> :
                        <BadCell><ElementIcon element={data.Elements.Element1}/></BadCell>}

                    {data.Elements.Element2 === actualPal!.Elements.Element2 ?
                        <GoodCell><ElementIcon element={data.Elements.Element2}/></GoodCell> :
                        <BadCell><ElementIcon element={data.Elements.Element2}/></BadCell>}

                    <EvaluatedCell data1={Number(data.FoodNeed)} data2={Number(actualPal!.FoodNeed)}>
                        {data.FoodNeed}
                    </EvaluatedCell>
            </>
        )
    }

    return (
        <div>
            {won && <div>
                <h1> You won! </h1>
            </div>}

            <ComboboxForm onSubmit={onSubmit}/>
            <div className="m-auto grid grid-cols-5 gap-4">
                    <HeaderCell>Pal name</HeaderCell>
                    <HeaderCell>Paldeck number</HeaderCell>
                    <HeaderCell>Element 1</HeaderCell>
                    <HeaderCell>Element 2</HeaderCell>
                    <HeaderCell>Food need</HeaderCell>
                    {guessedPals && guessedPals.map((data) => <Guess data={data} key={Number(data.Paldeck.PaldeckNumber.slice(1))} />)}
            </div>
        </div>
    )
}

function TCell({children, styles}: {children: ReactNode, styles?:string}) {
    return (
        <div className={`p-3 border-black w-[100px] h-[100px] bg-white grid place-content-center rounded-md text-center ${styles}`}>
            {children}
        </div>
    )
}

function EvaluatedCell({children, data1, data2}: {children: ReactNode, data1: number, data2: number}) {
    if (data1 === data2) {
        return (
            <GoodCell>
                {children}
            </GoodCell>
        )
    } else if (data1 > data2) {
        return (
            <GreaterCell>
                {children}
            </GreaterCell>
        )
    } else {
        return (
            <LesserCell>
                {children}
            </LesserCell>
        )
    }
}

function HeaderCell({children}: {children: ReactNode}) {
    return (
        <div>
            <TCell styles="mb-4 font-bold">
                {children}
            </TCell>
            <div className="w-[100px] h-1 bg-slate-900 rounded-2xl"/>
        </div>
    )
}

function GoodCell({children}: {children: ReactNode}) {
    return (
        <TCell styles={"!bg-green-400"}>
            {children}
        </TCell>
    )
}

function BadCell({children}: {children: ReactNode}) {
    return (
        <TCell styles={"!bg-red-400"}>
            {children}
        </TCell>
    )
}

function GreaterCell({children}: {children: ReactNode}) {
    return (
        <TCell styles={"!bg-red-400"}>
            <div className="inline-flex items-center gap-2">
                {children}
                <ArrowDownIcon className="relative z-10"/>
            </div>
        </TCell>
    )
}

function LesserCell({children}: {children: ReactNode}) {
    return (
        <TCell styles={"!bg-red-400"}>
            <div className="inline-flex items-center gap-2">
                {children}
                <ArrowUpIcon className="relative z-10"/>
            </div>
        </TCell>
    )
}

export default Main;