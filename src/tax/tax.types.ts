export interface TaxBracket {
    max: number | null,
    min: number,
    rate: number
}

export interface TaxBracketAccumulate extends TaxBracket {
    sum: number
}
