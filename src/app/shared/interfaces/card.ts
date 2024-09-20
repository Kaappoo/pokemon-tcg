interface Images{
    small: string,
    large: string
}

interface Set {
    name: string
}

interface CardMarket {
    averageSellPrice: number
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
    set: Set,
    number: string,
    artist: string,
    rarity: string,
    flavorText: string,
    nationalPokedexNumbers: number[],
    legalities: object,
    regulationMark: string,
    images: Images,
    tcgplayer: object,
    cardmarket: CardMarket
}

export interface CardRequest {
    first: number,
    rows: number,
    set: string,
    type: string,
    subtype: string,
    search: string,
}

export interface CardResponse {
    count: number,
    data: Card[],
    page: number,
    pageSize: number,
    totalCount: number
}
export interface SingularCardResponse {
    data: Card,
}






