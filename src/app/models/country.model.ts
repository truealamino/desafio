export interface Country {
    alpha3Code: string,
    capital: string,
    flag: string,
    name: string,
    population: number,
    borders: string[],
    currencies: Currency[],
    languages: Language[],
    regionalBlocs: RegionalBloc[],
    timezones: string[],
    region: string
}

export interface Currency {
    code: string,
    name: string,
    symbol: string
}

export interface Language {
    iso639_1: string,
    iso639_2: string,
    name: string,
    nativeName: string
}

export interface RegionalBloc {
    acronym: string,
    name: string,
    otherAcronyms: string[],
    otherNames: string[]
}

export interface Border {
    alpha3Code: string,
    name: string,
    borders?: null
}
