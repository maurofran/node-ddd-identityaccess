import { Observable } from "@reactivex/rxjs";
import Tenant from "./Tenant";
import TenantId from "./TenantId";

/**
 * Repository interface for tenants.
 */
interface ITenantRepository {
    /**
     * Retrieve the next tenant id available.
     * @returns the observable over next tenant identifier
     */
    nextIdentity(): Observable<TenantId>;

    /**
     * Adds a new tenant to this repository.
     * @param tenant the tenant to add
     * @returns the observable over the tenant just added
     */
    add(tenant: Tenant): Observable<Tenant>;

    /**
     * Updated an existing tenant stored in this repository.
     * @param tenant the tenant to update
     * @returns the observable over the operation outcome
     */
    update(tenant: Tenant): Observable<any>;

    /**
     * Removes a tenant from this repository.
     * @param tenant the tenant to remove
     * @returns the observable over the operation outcome
     */
    remove(tenant: Tenant): Observable<any>;

    /**
     * Retrieve a tenant with provided name.
     * @param name the name to look for
     * @returns the observable over the tenant with provided name
     */
    tenantNamed(name: string): Observable<Tenant>;

    /**
     * Retrieve a tenant with provided tenant id.
     * @param tenantId the unique tenant identifier
     * @returns the observable over the tenant with provided name
     */
    tenantOfId(tenantId: TenantId): Observable<Tenant>;
}

export default ITenantRepository;