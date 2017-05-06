import * as assert from "assert";
import * as _ from "lodash";

const FIRST_NAME_PATTERN = /[A-Z][a-z]*/;
const LAST_NAME_PATTERN = /^[a-zA-Z'][ a-zA-Z'-]*[a-zA-Z']?/;

/**
 * FullName is the value object representing a full person name.
 */
export default class FullName {
    /**
     * Creates a new full name with provided first and last name.
     *
     * @param firstName - the first name
     * @param lastName - the last name
     */
    constructor(public readonly firstName: string, public readonly lastName: string) {
        assert(!_.isEmpty(firstName), "firstName is required");
        assert(firstName.match(FIRST_NAME_PATTERN), "firstName format is not valid");
        assert(!_.isEmpty(lastName), "lastName is required");
        assert(lastName.match(LAST_NAME_PATTERN), "lastName format is not valid");
    }

    /**
     * Return a new full name with provided changed first name.
     *
     * @param firstName - the first name
     * @returns {FullName} - the new full name
     */
    public withChangedFirstName(firstName: string): FullName {
        return new FullName(firstName, this.lastName);
    }

    /**
     * Return a new full name with provided changed last name.
     *
     * @param lastName - the last name
     * @returns {FullName} - the new full name
     */
    public withChangedLastName(lastName: string): FullName {
        return new FullName(this.firstName, lastName);
    }

    /**
     * The formatted name.
     *
     * @returns {string} - the full name
     */
    public get formattedName(): string {
        return this.firstName + " " + this.lastName;
    }

    public equals(other: any): boolean {
        return other instanceof FullName && this.firstName === other.firstName && this.lastName === other.lastName;
    }

    public toString(): string {
        return "FullName [firstName=" + this.firstName + ", lastName=" + this.lastName + "]";
    }
}
