import * as assert from "assert";
import * as _ from "lodash";

const EMAIL_PATTERN = /\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/;

/**
 * Value object used to represent an e-mail address.
 */
export default class EmailAddress {
    constructor(public readonly address: string) {
        assert(!_.isEmpty(address), "address is required");
        assert(_.toLength(address) <= 255, "address must be 255 characters or less");
        assert(address.match(EMAIL_PATTERN), "address is not a valid email");

        this.address = address;
    }

    public equals(other: any): boolean {
        return other instanceof EmailAddress && this.address === other.address;
    }

    public toString(): string {
        return "EmailAddress [address=" + this.address + "]";
    }
}
