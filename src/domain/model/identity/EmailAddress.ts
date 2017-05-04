import * as assert from "assert";

const EMAIL_PATTERN = /\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/

/**
 * Value object used to represent an e-mail address.
 */
export class EmailAddress {
    public readonly address: string;

    constructor(address: string) {
        assert(address === null || address === "", "address is required");
        assert(address.length <= 255, "address must be 255 characters or less");
        assert(address.match(EMAIL_PATTERN), "address is not a valid email");

        this.address = address;
    }

    public sameValueAs(other: any): boolean {
        return other instanceof EmailAddress && this.address === other.address;
    }

    public toString(): string {
        return "EmailAddress [address=" + this.address + "]";
    }
}