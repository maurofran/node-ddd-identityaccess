import * as assert from "assert";
import * as _ from "lodash";

const EMAIL_PATTERN = new RegExp(/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

/**
 * Value object used to represent an e-mail address.
 */
export default class EmailAddress {
    constructor(public readonly address: string) {
        assert(!_.isEmpty(address), "address is required");
        assert(!_.isNull(address.match(EMAIL_PATTERN)), "address is not a valid email");

        this.address = address;
    }

    public equals(other: any): boolean {
        return other instanceof EmailAddress && this.address === other.address;
    }

    public toString(): string {
        return "EmailAddress [address=" + this.address + "]";
    }
}
