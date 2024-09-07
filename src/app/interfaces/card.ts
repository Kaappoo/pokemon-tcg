export interface Card {
    id: string,
    name: string
    supertype: string,
    subtypes: string[],
    level: string,
    hp: string,
    types: string[],
    evolvesFrom: string,
    evolvesTo: string[],
    rules: string[],
    ancientTrait: object,
    abilities: object[],
    attacks: object[],
    weaknesses: object[],
    resistances: object[],
    retreatCost: string[],
    convertedRetreatCost: number,
    set: object,
    number: string,
    artist: string,
    rarity: string,
    flavorText: string,
    nationalPokedexNumbers: number[],
    legalities: object,
    regulationMark: string,
    images: object,
    tcgplayer: object,
    cardmarket: object
}
