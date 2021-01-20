import * as R from "ramda"
import {TaxBracket, TaxBracketAccumulate} from "./tax.types";


/**
 * Determines the sum of tax to be paid for a bracket.
 *
 * @param bracket - Min, Max, and rate of taxation for bracket.
 *
 * @returns - Amount of tax due.
 */
const _accumulatorSum = (bracket: TaxBracket): number =>
    bracket.max == null ? 0 : (bracket.max - bracket.min) * bracket.rate


/**
 * Replaces the tax bracket with a bracket containing the accumulated amount of tax
 * due if income is greater than the maximum.
 *
 * @param bracket - Tax Bracket with min, max, and rate.
 *
 * @returns - New tax bracket with cumulative tax added.
 */
const _accumulator = (bracket: TaxBracket): TaxBracketAccumulate =>
    Object.assign({}, bracket, {sum: _accumulatorSum(bracket)})


/**
 * Calculates the tax due dependent on the the bracket widths and income.
 *
 * @param income - Gross income.
 *
 * @returns - Amount of tax due
 */
const cumulativeTax = (income: number) =>   // TODO: Replace with Ramda Curry
    (bracket: TaxBracketAccumulate): number =>
        (bracket.max == null || income <= bracket.max) ?
            Math.max((income - bracket.min) * bracket.rate, 0) :
            bracket.sum


/**
 * Curried function that calculates the amount of income tax to be deducted, based on the
 * tax function given
 *
 * @param income - Gross Income
 *
 * @returns - Function that calculates tax, given tax brackets input
 */
export const incomeTaxFunction = (income: number): (brackets: TaxBracket[]) => number =>
    R.pipe(
        R.map(_accumulator),
        R.map(cumulativeTax(income)),
        R.sum
    )