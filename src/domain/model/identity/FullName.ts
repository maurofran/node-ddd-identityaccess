import * as assert from "assert";
import * as _ from "lodash";

const FIRST_NAME_PATTERN = /[A-Z][a-z]*/;
const LAST_NAME_PATTERN = /^[a-zA-Z'][ a-zA-Z'-]*[a-zA-Z']?/;

/**
 * FullName is the value object representing a full person name.
 */
export default class FullName {
    constructor(public readonly firstName: string, public readonly lastName: string) {
        assert(!_.isEmpty(firstName), "firstName is required");
        assert(_.toLength(firstName) <= 70, "firstName must be 70 characters or less");
        assert(firstName.match(FIRST_NAME_PATTERN), "firstName format is not valid");
        assert(!_.isEmpty(lastName), "lastName is required");
        assert(_.toLength(lastName) <= 70, "lastName must be 70 characters or less");
        assert(lastName.match(LAST_NAME_PATTERN), "lastName format is not valid");
    }

    public withChangedFirstName(firstName: string): FullName {
        return new FullName(firstName, this.lastName);
    }

    public withChangedLastName(lastName: string): FullName {
        return new FullName(this.firstName, lastName);
    }

    public get fullName(): string {
        return this.firstName + " " + this.lastName;
    }

    public equals(other: any): boolean {
        return other instanceof FullName && this.firstName === other.firstName && this.lastName === other.lastName;
    }

    public toString(): string {
        return "FullName [firstName=" + this.firstName + ", lastName=" + this.lastName + "]";
    }
}
