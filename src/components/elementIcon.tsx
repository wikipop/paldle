import WaterElement from '../assets/elements/palworld-water-element-icon.png';
import FireElement from '../assets/elements/palworld-fire-element-icon.png';
import DarkElement from '../assets/elements/palworld-dark-element-icon.png';
import DragonElement from '../assets/elements/palworld-dragon-element-icon.png';
import ElectricityElement from '../assets/elements/palworld-electricity-element-icon.png';
import IceElement from '../assets/elements/palworld-ice-element-icon.png';
import GrassElement from '../assets/elements/palworld-grass-element-icon.png';
import GroundElement from '../assets/elements/palworld-ground-element-icon.png';
import NeutralElement from '../assets/elements/palworld-neutral-element-icon.png';

import {Cross2Icon} from "@radix-ui/react-icons";

import type { elements } from '../types/pal.d.tsx'

const elementEnum = {
    "Water": WaterElement,
    "Fire": FireElement,
    "Dark": DarkElement,
    "Dragon": DragonElement,
    "Electricity": ElectricityElement,
    "Ice": IceElement,
    "Grass": GrassElement,
    "Ground": GroundElement,
    "Neutral": NeutralElement,
}

function ElementIcon({ element } : {element: elements}) {
    if (!(element in elementEnum)) {
        return (
            <Cross2Icon width="70" height="70"/>
        )
    }
    return (
        <img src={elementEnum[element]} alt={element}/>
    )
}

export default ElementIcon;