import * as _ from "lodash";

import EmailAddress from "../domain/model/identity/EmailAddress";
import FullName from "../domain/model/identity/FullName";
import ITenantRepository from "../domain/model/identity/ITenantRepository";
import PostalAddress from "../domain/model/identity/PostalAddress";
import Telephone from "../domain/model/identity/Telephone";
import Tenant from "../domain/model/identity/Tenant";
import TenantId from "../domain/model/identity/TenantId";
import TenantProvisioningService from "../domain/model/identity/TenantProvisioningService";

import {Observable} from "@reactivex/rxjs";

import ActivateTenantCommand from "./command/ActivateTenantCommand";
import DeactivateTenantCommand from "./command/DeactivateTenantCommand";
import ProvisionTenantCommand from "./command/ProvisionTenantCommand";

/**
 * Application service for identity management.
 */
export default class IdentityApplicationService {
    constructor(private readonly tenantRepository: ITenantRepository,
                private readonly tenantProvisioningService: TenantProvisioningService) {
    }

    /**
     * Activate a tenant.
     *
     * @param command - The command to execute.
     * @returns {Observable<any>} - The observable over the operation outcome.
     */
    public activateTenant(command: ActivateTenantCommand): Observable<any> {
        return this.existingTenant(command.tenantId)
            .do((t) => t.activate())
            .flatMap((t) => this.tenantRepository.update(t));
    }

    /**
     * Deactivate a tenant.
     *
     * @param command - The command to execute.
     * @returns {Observable<any>} - The observable over the operation outcome.
     */
    public deactivateTenant(command: DeactivateTenantCommand): Observable<any> {
        return this.existingTenant(command.tenantId)
            .do((t) => t.deactivate())
            .flatMap((t) => this.tenantRepository.update(t));
    }

    /**
     * Provision a new tenant.
     *
     * @param command - The command to execute.
     * @returns {Observable<string>} - The observable over the newly created tenant id.
     */
    public provisionTenant(command: ProvisionTenantCommand): Observable<string> {
        const fullName = new FullName(command.administratorFirstName, command.administratorLastName);
        const postalAddress = new PostalAddress(command.addressStreetName, command.addressBuildingNumber,
                                                command.addressPostalCode, command.addressCity,
                                                command.addressStateProvince, command.addressCountryCode);
        const emailAddress = new EmailAddress(command.emailAddress);
        const primaryTelephone = new Telephone(command.primaryTelephone);
        const secondaryTelephone = _.isEmpty(command.secondaryTelephone)
            ? null
            : new Telephone(command.secondaryTelephone);

        return this.tenantProvisioningService.provisionTenant(command.tenantName, command.tenantDescription,
                                                              fullName, emailAddress, postalAddress,
                                                              primaryTelephone, secondaryTelephone)
            .map((t) => t.tenantId.id);
    }

    private existingTenant(tenantId: string): Observable<Tenant> {
        return this.tenantRepository.tenantOfId(new TenantId(tenantId));
    }
}
