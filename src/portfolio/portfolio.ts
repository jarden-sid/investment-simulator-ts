import {continuousReturn, investmentReturn, investmentRisk, stochasticCompounding} from "../utils";
import {continuousContributions} from "../contributions";
import {PortfolioResults} from "./portfolio.types";
import {mean, std} from "mathjs";

import * as R from "ramda";


/**
 * Returns a single random simulation of a portfolio following brownian motion
 *
 * @param simulation - The initial value of the investment being simulated
 * @param simReturn - Annual return of the portfolio being modeled
 * @param simRisk - Standard deviation of the portfolio being modeled
 * @param period - total steps in the random walk
 * @param contributionFunction - Function that gives additional contributions to the portfolio at
 * regular intervals
 *
 * @returns - Single simulation of a random walk
 */
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


/**
 * Calculates a Monte Carlo Simulation of a given Portfolio and asset metrics
 * to model the potential growth of the portfolio over time.
 *
 * @param weightings - Vector of portfolio allocation weights adding to 1
 * @param returns - Vector of asset returns as percentages
 * @param covariance - Covariance matrix of portfolio allocations
 * @param period - Number of years to simulate
 * @param initialInvestment - Initial value of the portfolio
 * @param fee  - ercentage based annual fee on holdings. Default 0
 * @param simulations - Number of simulations run
 * @param contributionFunction - Function that gives additional contributions
 * to the portfolio at regular intervals
 *
 * @returns - SimulationResult Object that wraps key statistics of the simulation
 */
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
    const portfolioReturn = investmentReturn(weightings, returns, fee)
    const portfolioRisk = investmentRisk(weightings, covariance)
    const partialRandomWalk = R.partialRight(randomWalk, [
        continuousReturn(portfolioReturn),
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