import { sqrt } from "mathjs";
import {portfolioGrowthSimulation} from "./portfolio";

describe("Portfolio Simulation Test", function (){
    it('should be equal to', function () {
        const result  = portfolioGrowthSimulation(
            [0.5, 0.5],
            [0.1, 0.1],
            [[0.001, 0.000], [0.000, 0.001]],
            10);
        expect(result.portfolioReturn).toBeCloseTo(0.1);
        expect(result.portfolioRisk).toBeCloseTo(sqrt(0.0005));
    });
})