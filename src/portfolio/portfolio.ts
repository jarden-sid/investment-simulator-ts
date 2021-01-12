import {continuousReturn, investmentReturn, investmentRisk, stochasticCompounding} from "../utils/utils";
import {continuousContributions} from "../contributions/contributions";
import {PortfolioResults} from "./portfolio.types";
import {mean, std} from "mathjs";

import * as R from "ramda";


export const randomWalk = (
    simulation: number,
    simReturn: number,
    simRisk: number,
    period: number = 10,
    contributionFunction: (step: number) => number = continuousContributions(0, 0),
): number[] =>
    R.reduce((acc, elem: number) =>
        [...acc, stochasticCompounding(simReturn, simRisk, R.last(acc)!) + contributionFunction(elem)],
        [simulation])(Array.from({length: period}, (v, i) => i));


export const portfolioGrowthSimulation = (
    weightings: number[],
    returns: number[],
    covariance: number[][],
    period: number = 10,
    initialInvestment: number = 1,
    fee: number = 0.00,
    simulations: number = 1_000,
    contributionFunction: (step: number) => number = continuousContributions(0, 0)
): PortfolioResults => {
    const portfolioReturn = continuousReturn(investmentReturn(weightings, returns, fee))
    const portfolioRisk = investmentRisk(weightings, covariance)
    const partialRandomWalk = R.partialRight(randomWalk, [
        portfolioReturn,
        portfolioRisk,
        period,
        contributionFunction
    ])
    const [_mean, _std]  = R.pipe(
       R.map(partialRandomWalk),
       R.transpose,
       R.juxt([R.map(mean), R.map(std)]),
    )(Array.from({length: simulations}, () => initialInvestment))
    return {
        portfolioReturn,
        portfolioRisk,
        simulationMean: _mean,
        simulationSTD: _std,
    }
}