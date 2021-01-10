import * as R from "ramda";
import {_randomVectorWeights, allocationsSimulation, simulatePortfolio} from "./allocations";

describe("Allocation Unit Tests", function (){
    it('should be close to', function () {
        expect(R.sum(_randomVectorWeights(10))).toBeCloseTo(1)
    });
    it('should be close to', function () {
        const result =simulatePortfolio(
            [0.1, 0.1],
            [[1, 0.000], [0.000, 1]])
            ([0.5, 0.5]);
        expect(result.simReturn).toBeCloseTo(0.1);
        expect(result.simRisk).toBeCloseTo(0.7071067811865476);
    });
    it('should should be', function () {
        const result = allocationsSimulation(
            [0.1, 0.1],
            [[1, 0.000], [0.000, 1]],
            10)
        expect(result.simReturn).toBeCloseTo(0.1);
        expect(result.simRisk).toBeCloseTo(0.7071067811865476);
        expect(R.sum(result.weights)).toBeCloseTo(1);
    });
})