import * as assert from "assert";
import * as _ from "lodash";
import * as uuid from "uuid";

import {Observable} from "@reactivex/rxjs";
import {Collection, Db} from "mongodb";

import ITenantRepository from "../../domain/model/identity/ITenantRepository";
import Tenant from "../../domain/model/identity/Tenant";
import TenantId from "../../domain/model/identity/TenantId";

const TENANTS_COLLECTION = "tenants";

/**
 * Tenant repository implementation.
 */
export default class TenantRepository implements ITenantRepository {
    constructor(private readonly db: Db) {
        assert(!_.isNull(db), "db is required");
    }

    public nextIdentity(): Observable<TenantId> {
        return Observable.of(uuid.v4()).map((uuid) => new TenantId(uuid));
    }

    public add(tenant: Tenant): Observable<Tenant> {
        assert(!_.isNull(tenant), "tenant is required");

        return Observable.fromPromise(this.collection().insertOne({
            active: tenant.active,
            description: tenant.description,
            name: tenant.name,
            tenantId: tenant.tenantId.id,
        })).map((r) => {
            if (r.insertedCount === 0) {
                throw new Error("An error occurred while adding tenant into repository.");
            }
            return tenant;
        });
    }

    public update(tenant: Tenant): Observable<any> {
        assert(!_.isNull(tenant), "tenant is required");

        return Observable.fromPromise(this.collection().updateOne({
            tenantId: tenant.tenantId.id,
        }, {
            $set: {
                active: tenant.active,
                description: tenant.description,
                name: tenant.name,
            },
        })).map((r) => {
            if (r.modifiedCount === 0) {
                throw new Error("An error occurred while updating tenant into repository.");
            }
            return null;
        });
    }

    public remove(tenant: Tenant): Observable<any> {
        assert(!_.isNull(tenant), "tenant is required");

        return Observable.fromPromise(this.collection().deleteOne({
            tenantId: tenant.tenantId.id,
        })).map((r) => {
            if (r.deletedCount === 0) {
                throw new Error("An error occurred while removing tenant from repository.");
            }
            return null;
        });
    }

    public tenantNamed(name: string): Observable<Tenant> {
        return Observable.fromPromise(this.collection().findOne({ name })).map((r) => this.readTenant(r));
    }

    public tenantOfId(tenantId: TenantId): Observable<Tenant> {
        return Observable.fromPromise(this.collection().findOne({ tenantId: tenantId.id }))
            .map((r) => this.readTenant(r));
    }

    private collection(): Collection {
        return this.db.collection(TENANTS_COLLECTION);
    }

    private readTenant(r: any): Tenant {
        return new Tenant(new TenantId(r.tenantId), r.name, r.description, r.active);
    }
}
