import {TaxBracket} from "./tax.types";

export const NZ_TAX_BRACKETS: TaxBracket[] = [
    {
        "max": 14_000,
        "min": 0,
        "rate": 0.105,
    },
    {
        "max": 48_000,
        "min": 14_000,
        "rate": 0.175,
    },
    {
        "max": 70_000,
        "min": 48_000,
        "rate": 0.30,
    },
    {
        "max": 180_000,
        "min": 70_000,
        "rate": 0.33,
    },
    {
        "max": null,
        "min": 180_000,
        "rate": 0.39,
    },
]
