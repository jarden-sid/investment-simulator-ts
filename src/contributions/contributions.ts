/**
 * Creates a function that returns a contribution, compounded by the input growth at each step
 *
 * @param income - Initial amount to be contributed
 * @param growth - Rate at which the contribution grows each step
 *
 * @returns - function that returns the contribution give a step
 */
export const continuousContributions = (income: number, growth: number = 0) =>
    (step: number) => income * Math.pow((1 + growth), step)


/**
 * Creates a function that returns a contribution based on a percentage of input income, compounded
 * by the input growth at each step. The contribution is calculated as a percentage of after tax
 * income. The tax system is provided as a function itself
 *
 * @param income - Total Income
 * @param contribution - Percentage of income to be contributed
 * @param growth - Rate at with income increases each step
 *
 * @returns - Function that takes a step and returns the contribution
 */
export const percentageContribution = (income: number, contribution: number, growth: number = 0) =>
    (step: number) => income * contribution * (1 + growth) ** step
