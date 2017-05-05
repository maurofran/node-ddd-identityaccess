import * as assert from "assert";
import * as _ from "lodash";
import TenantId from "./TenantId";

/**
 * Tenant is the aggregate root object used to model a tenant in the IAS system.
 */
export default class Tenant {
    constructor(public tenantId: TenantId, public name: string, public description: string, public active: boolean) {
        assert(!_.isNull(tenantId), "tenantId is required");
        assert(!_.isEmpty(name), "name is required");
        assert(_.toLength(name) <= 35, "name must be 35 characters or less");
        assert(!_.isEmpty(description), "description is required");
        assert(_.toLength(description) <= 150, "description must be 150 characters or less");
    }

    /**
     * Activate this tenant.
     */
    public activate(): void {
        if (!this.active) {
            this.active = true;
            // TODO raise TenantActivated event.
        }
    }

    /**
     * Deactivate this tenant.
     */
    public deactivate(): void {
        if (this.active) {
            this.active = false;
            // TODO raise TenantDeactivated event
        }
    }

    /**
     * Compare this tenant with provided one.
     *
     * @param other the other object
     * @return true if the other object has the same tenant id and name of this one and false otherwise
     */
    public equals(other: any): boolean {
        return other instanceof Tenant && this.tenantId.equals(other.tenantId) && this.name === other.name;
    }

    public toString(): string {
        return "Tenant [tenantId=" + this.tenantId + ", name=" + this.name + ", description=" + this.description
                + ", active=" + this.active + "]";
    }
}
