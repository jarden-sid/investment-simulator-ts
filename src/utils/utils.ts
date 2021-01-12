import {dot, log, sqrt, transpose, multiply, exp, random} from "mathjs"
// @ts-ignore   no types and im lazy :(
import {normal} from "jstat";


export const stochasticCompounding = (
    continuousReturn: number,
    risk: number,
    investment: number
): number => investment * exp(normal.inv(random(), continuousReturn - 0.5 * risk ** 2, risk))


export const investmentReturn = (
    weights: number[],
    returns: number[],
    fee: number = 0,
): number =>
    dot(weights, returns) - fee


export const investmentRisk = (
    weights: number[],
    covariance: number[][]
): number => {
    // @ts-ignore. Vector multiplication always results in 1x1 matrix.
    return sqrt(multiply(multiply([weights], covariance), transpose(weights))[0])
}


export const continuousReturn = (annualReturn: number) =>
    log(1 + annualReturn)

