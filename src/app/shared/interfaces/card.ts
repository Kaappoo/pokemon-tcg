interface images{
    small: string,
    large: string
}

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
    images: images,
    tcgplayer: object,
    cardmarket: object
}

export interface CardRequest {
    first: number,
    rows: number
}

export interface CardResponse {
    count: number,
    data: Card[],
    page: number,
    pageSize: number,
    totalCount: number
}
