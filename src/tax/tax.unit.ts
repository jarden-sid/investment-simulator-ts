import {incomeTaxFunction} from "./tax";
import {NZ_TAX_BRACKETS} from "./tax.constants";

describe("Tax Unit Test", function () {
    it('should be equal', function () {
        expect(incomeTaxFunction(100_000)(NZ_TAX_BRACKETS)).toBeCloseTo(23_920)
    });
})