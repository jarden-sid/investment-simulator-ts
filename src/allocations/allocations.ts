import * as R from "ramda"
import {AllocationsSim} from "./allocations.types";
import {investmentReturn, investmentRisk} from "../utils";


/**
 * Creates a vector of random numbers that sum to one to represent asset class weightings
 *
 * @param size - length of the vector
 *
 * @returns - vector of asset weightings
 */
export const _randomVectorWeights = (size: number): number[] => {
    const initialVector = Array.from({length: size}, () => Math.random())
    const vectorSum = R.sum(initialVector)
    return R.map((num: number) => num / vectorSum, initialVector)
}


/**
 * Function that calculates a series of statistics about a simulated portfolio.
 *
 * @param returns - Vector of annual returns of assets being optimized for.
 * @param covariance - Covariance matrix of assets being optimized for.
 *
 * @returns - Sharpe Ratio, Weightings, Annual Return, Risk
 */
export const simulatePortfolio = (returns: number[], covariance: number[][]) =>
    (weights: number[]): AllocationsSim => {
        const rtrn = investmentReturn(returns, weights)
        // @ts-ignore. Vector multiplication always results in 1x1 matrix.
        const risk: number = investmentRisk(weights, covariance)
        return {
            sharpeRatio: (rtrn - 0.01) / (risk),   // fixme types
            simReturn: rtrn,
            simRisk: risk,
            weights: weights,
        }
    }


/**
 * Calculates the optimum portfolio weightings for a given set of returns and covariance of assets
 *
 * @param annualReturns - Vector of annual returns of assets being optimized for.
 * @param covariance - Covariance matrix of assets being optimized for.
 * @param simulations - Number of simulations run.
 *
 * @returns - Sharpe Ratio, Weightings, Annual Return, Risk of the most optimum portfolio
 */
export const portfolioAllocationsSimulation = (
    annualReturns: number[],
    covariance: number[][],
    riskFreeRate: number,
    simulations: number = 1_000,
) => R.pipe(
    R.map(_randomVectorWeights),
    R.map(simulatePortfolio(annualReturns, covariance, riskFreeRate)),
    R.reduce(
        R.maxBy((obj: AllocationsSim) => obj.sharpeRatio), {
            sharpeRatio: 0,
            simReturn: 0,
            simRisk: 0,
            weights: []
        })
)(Array.from({length: simulations}, () => annualReturns.length))