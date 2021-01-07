import {continuousContributions, percentageContribution} from "./contributions";

describe('Contribution Function Tests', function () {
    it('should be equal', function () {
        expect(continuousContributions(100, 0.1)(1)).toBeCloseTo(110)
    });
    it('should be equal', function () {
        expect(percentageContribution(100, 0.1)(1)).toBeCloseTo(10)
    });

});