import * as R from "ramda"
import {TaxBracket, TaxBracketAccumulate} from "./tax.types";

const _accumulatorSum = (bracket: TaxBracket): number =>
    bracket.max == null ? 0 : (bracket.max - bracket.min) * bracket.rate

const _accumulator = (bracket: TaxBracket): TaxBracketAccumulate =>
    Object.assign({}, bracket, {sum: _accumulatorSum(bracket)})

const cumulativeTax = (income: number) =>   // TODO: Replace with Ramda Curry
    (bracket: TaxBracketAccumulate): number =>
        (bracket.max == null || income <= bracket.max) ?
            Math.max((income - bracket.min) * bracket.rate, 0) :
            bracket.sum

export const incomeTaxFunction = (income: number): (brackets: TaxBracket[]) => number =>
    R.pipe(
        R.map(_accumulator),
        R.map(cumulativeTax(income)),
        R.sum
    )