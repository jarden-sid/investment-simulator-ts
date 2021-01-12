import * as R from "ramda"
import {AllocationsSim} from "./allocations.types";
import {investmentReturn, investmentRisk} from "../utils/utils";




export const _randomVectorWeights = (size: number): number[] => {
    const initialVector = Array.from({length: size}, () => Math.random())
    const vectorSum = R.sum(initialVector)
    return R.map((num: number) => num / vectorSum, initialVector)
}


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


export const portfolioAllocationsSimulation = (
    annual_returns: number[],
    covariance: number[][],
    simulations: number = 1_000,
) => R.pipe(
    R.map(_randomVectorWeights),
    R.map(simulatePortfolio(annual_returns, covariance)),
    R.reduce(
        R.maxBy((obj: AllocationsSim) => obj.sharpeRatio), {
            sharpeRatio: 0,
            simReturn: 0,
            simRisk: 0,
            weights: []
        })
)(Array.from({length: simulations}, () => annual_returns.length))