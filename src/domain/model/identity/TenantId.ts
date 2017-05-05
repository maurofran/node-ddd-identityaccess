import * as assert from "assert";

/**
 * TenantId is the value object for tenant unique identifiers.
 */
export default class TenantId {
    constructor(public readonly id: string) {
        assert(this.id !== null && this.id !== "", "id is required");
    }

    /**
     * Check if this value object
     *
     * @param other the other object
     * @returns {boolean} true if the other object is true and false otherwise
     */
    public equals(other: any): boolean {
        return other instanceof TenantId &&  this.id === other.id;
    }

    public toString(): string {
        return "TenantId [id=" + this.id + "]";
    }
}
