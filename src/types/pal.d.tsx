export type elements = "Water" | "Fire" | "Dark" | "Dragon" | "Electricity" | "Ice" | "Grass" | "Ground" | "Neutral"

export type pal = {
    Paldeck: {
        PalName: string,
        PaldeckNumber: string,
        PaldeckEntry: string,
        PalAppearance: string
    },
    Elements: {
        Element1: elements,
        Element2: elements
    },
    Drops: {
        Drop1: string,
        Drop2: string,
        Drop3: string,
        Drop4: string
    },
    FoodNeed: string,
    PartnerSkill: {
        PartnerSkillName: string,
        PartnerSkillDescription: string
    },
    WorkSuitability: {
        Kindling: string,
        Planting: string,
        Handiwork: string,
        Lumbering: string,
        MedicineProduction: string,
        Transporting: string,
        Watering: string,
        GeneratingElectricity: string,
        Gathering: string,
        Mining: string,
        Cooling: string,
        Farming: string
    }
}