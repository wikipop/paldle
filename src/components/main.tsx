import {FormEvent, useEffect, useRef, useState} from "react";
import type {pal} from "../types/pal.d.tsx";
import {ComboboxForm} from "./searchForm.tsx";

const BASE_URL = import.meta.env.VITE_API_URL;

async function sendGuess(name: string): Promise<pal | null> {
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
    const [guesses, setGuesses] = useState<pal[] | []>([]);
    const [actualPal, setActualPal] = useState<pal | null>(null);

    useEffect(() => {
        console.log(BASE_URL)
        getRandomPal().then((palName) => {
            sendGuess(palName).then((pal) => setActualPal(pal))
        })
    }, [])

    return (
        <div>
            <ComboboxForm actualPal={actualPal} setGuesses={setGuesses} guesses={guesses}/>
            <table className="bg-white m-auto rounded-md">
                <tbody>
                    <tr>
                        <TCell>Pal name</TCell>
                        <TCell>Paldeck number</TCell>
                        <TCell>Element 1</TCell>
                        <TCell>Element 2</TCell>
                        <TCell>Food need</TCell>
                    </tr>
                        {guesses && guesses.map((data) => <Guess data={data} />)}
                </tbody>
            </table>
        </div>
    )
}

function TCell({children}: {children: string}) {
    return (
        <td className="p-3 border-black">
            {children}
        </td>
    )
}

function Guess({data}: {data: pal}) {
    return (
        <tr key={Number(data.Paldeck.PaldeckNumber.slice(1))}>
            <td>
                <h1> {data.Paldeck.PalName} </h1>
            </td>
            <td>
                {data.Paldeck.PaldeckNumber}
            </td>
            <td>
                {data.Elements.Element1}
            </td>
            <td>
                {data.Elements.Element2}
            </td>
            <td>
                {data.FoodNeed}
            </td>
        </tr>
    )
}

export default Main;