import * as assert from "assert";
import * as _ from "lodash";

import EmailAddress from "./EmailAddress";
import FullName from "./FullName";
import ITenantRepository from "./ITenantRepository";
import PostalAddress from "./PostalAddress";
import Telephone from "./Telephone";
import Tenant from "./Tenant";

import {Observable} from "@reactivex/rxjs";

export default class TenantProvisioningService {
    constructor(private readonly tenantRepository: ITenantRepository) {
        assert(!_.isNull(tenantRepository), "tenantRepository is required");
    }

    /**
     * Provision a new tenant.
     *
     * @param name the tenant name
     * @param description the tenant description
     * @param administratorName the full name of administrator
     * @param emailAddress the email address of administrator
     * @param postalAddress the postal address of administrator
     * @param primaryTelephone the primary telephone number
     * @param secondaryTelephone the secondary telephone number
     * @returns {Observable<Tenant>} the observable over the provisioned tenant.
     */
    public provisionTenant(name: string, description: string, administratorName: FullName, emailAddress: EmailAddress,
                           postalAddress: PostalAddress, primaryTelephone: Telephone,
                           secondaryTelephone: Telephone): Observable<Tenant> {
        return this.tenantRepository.nextIdentity()
            .map((tenantId) => new Tenant(tenantId, name, description, true))
            .flatMap((tenant) => this.tenantRepository.add(tenant))
            .flatMap((tenant) => this.registerAdministratorFor(tenant, administratorName, emailAddress, postalAddress,
                primaryTelephone, secondaryTelephone));
    }

    private registerAdministratorFor(tenant: Tenant, administratorName: FullName, emailAddress: EmailAddress,
                                     postalAddress: PostalAddress, primaryTelephone: Telephone,
                                     secondaryTelephone: Telephone): Observable<Tenant> {
        // TODO Register administrator for provided tenant and data.
        return Observable.of(tenant);
    }
}
