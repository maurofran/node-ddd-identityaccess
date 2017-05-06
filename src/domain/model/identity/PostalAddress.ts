import * as assert from "assert";
import * as _ from "lodash";
/**
 * Value object for postal address.
 */
export default class PostalAddress {
    constructor(public readonly streetName: string,
                public readonly buildingNumber: string,
                public readonly postalCode: string,
                public readonly city: string,
                public readonly stateProvince: string,
                public readonly countryCode: string) {
        assert(!_.isEmpty(streetName), "streetName is required");
        assert(!_.isEmpty(postalCode), "postalCode is required");
        assert(!_.isEmpty(city), "city is required");
        assert(!_.isEmpty(stateProvince), "stateProvince is required");
        assert(!_.isEmpty(countryCode), "countryCode is required");
        assert(countryCode.length === 2, "countryCode must be 2 characters");
    }

    public equals(other: any): boolean {
        return other instanceof PostalAddress && this.streetName === other.streetName &&
                this.buildingNumber === other.buildingNumber && this.postalCode === other.postalCode &&
                this.city === other.city && this.stateProvince === other.stateProvince &&
                this.countryCode === other.countryCode;
    }

    public toString(): string {
        return "PostalAddress [streetName=" + this.streetName + ", buildingNumber=" + this.buildingNumber +
                ", postalCode=" + this.postalCode + ", city=" + this.city + ", stateProvince=" + this.stateProvince +
                ", countryCode=" + this.countryCode + "]";
    }
}
