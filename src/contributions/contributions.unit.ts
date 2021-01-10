import {continuousContributions, percentageContribution} from "./contributions";

describe('Contribution Function Tests', function () {
    it('continuous should be equal', function () {
        expect(continuousContributions(100, 0.1)(1)).toBeCloseTo(110)
    });
    it('percentage should be equal', function () {
        expect(percentageContribution(100, 0.1)(1)).toBeCloseTo(10)
    });

});