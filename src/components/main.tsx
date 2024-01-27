import {Input} from "./ui/input.tsx";
import {Button} from "./ui/button.tsx";
import {FormEvent, useEffect, useRef, useState} from "react";
import type {pal} from "../types/pal.d.tsx";

async function sendGuess(name: string): Promise<pal | null> {
    const response = await fetch(`https://fastapi-production-e412.up.railway.app/Pal='${name}'`)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json();
}

async function getRandomPal(): Promise<{"Pal":string}> {
    const response = await fetch(`https://fastapi-production-e412.up.railway.app/RandomPal`)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json();
}

function Main() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [guesses, setGuesses] = useState<[pal] | []>([]);
    const [actualPal, setActualPal] = useState<pal | null>(null);

    useEffect(() => {
        getRandomPal().then((data) => {
            console.log(data.Pal)
            sendGuess(data.Pal).then((pal) => {
                console.log(pal)
                setActualPal(pal);
            })
        })
    }, [])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(inputRef.current?.value)
        sendGuess(inputRef.current!.value).then((data) => {
            if(data){
                console.log(data)
                setGuesses([...guesses, data]);
            } else {
                alert("No pal found")
            }

        })

        inputRef.current!.value = "";
    }

    return (
        <div>
            <form className="inline-flex gap-2 mb-3" onSubmit={handleSubmit}>
                <Input type="text" placeholder="Guess pal" ref={inputRef}/>
                <Button type="submit"> Guess </Button>
            </form>
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