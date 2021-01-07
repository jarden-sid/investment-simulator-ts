import * as R from "ramda"

type TaxBracket = { max: number | null, min: number, rate: number }
type TaxBracketAccumulate = { max: number | null, min: number, sum: number, rate: number }


export const nzTaxBrackets: TaxBracket[] = [
    {
        "max": 14_000,
        "min": 0,
        "rate": 0.105,
    },
    {
        "max": 48_000,
        "min": 14_000,
        "rate": 0.175,
    },
    {
        "max": 70_000,
        "min": 48_000,
        "rate": 0.30,
    },
    {
        "max": 180_000,
        "min": 70_000,
        "rate": 0.33,
    },
    {
        "max": null,
        "min": 180_000,
        "rate": 0.39,
    },
]


const _accumulatorSum = (bracket: TaxBracket): number =>
    bracket.max == null ? 0 : (bracket.max - bracket.min) * bracket.rate


const _accumulator = (bracket: TaxBracket): TaxBracketAccumulate =>
    Object.assign({}, bracket, {sum: _accumulatorSum(bracket)})


const cumulativeTax = (income: number) =>
    (bracket: TaxBracketAccumulate): number => {
        if (bracket.max == null || income <= bracket.max) {
            return Math.max((income - bracket.min) * bracket.rate, 0)
        } else {
            return bracket.sum
        }
    }


export const incomeTaxFunction = (income: number): (brackets: TaxBracket[]) => number =>
    R.pipe(
        R.map(_accumulator),
        R.map(cumulativeTax(income)),
        R.sum
    )
