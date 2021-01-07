import {incomeTaxFunction, nzTaxBrackets} from "./tax";

describe("Tax Unit Test", function () {
    it('should be equal', function () {
        expect(incomeTaxFunction(100_000)(nzTaxBrackets)).toBeCloseTo(23_920)
    });
})