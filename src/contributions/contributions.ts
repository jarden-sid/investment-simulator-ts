export const continuousContributions = (income: number, growth: number = 0) =>
    (step: number) => income * Math.pow((1 + growth), step)

export const percentageContribution = (income: number, contribution: number, growth: number = 0) =>
    (step: number) => income * contribution * (1 + growth) ** step
