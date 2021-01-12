import {stochasticCompounding} from "./utils";

describe("Portfolio Simulation Test", function () {
    it('Stochastic Returns Test', function () {
        expect(stochasticCompounding(0.1, 0.1, 1)).toBeGreaterThan(1.0)
    });
})