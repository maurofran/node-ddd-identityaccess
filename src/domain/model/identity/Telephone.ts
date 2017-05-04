import * as assert from "assert";
import * as _ from "lodash";

/**
 * Value object for telephone number.
 */
export default class Telephone {
    constructor(public readonly phoneNumber: string) {
        assert(!_.isEmpty(phoneNumber), "phoneNumber is required");
        assert(_.toLength(phoneNumber) <= 18, "phoneNumber must be 18 characters or less");
    }

    public equals(other: any): boolean {
        return other instanceof Telephone && this.phoneNumber === other.phoneNumber;
    }

    public toString(): string {
        return "Telephone [number=" + this.phoneNumber + "]";
    }
}
