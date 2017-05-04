import * as assert from "assert";
import * as _ from "lodash";
import * as uuid from "uuid";

import {Observable} from "@reactivex/rxjs";
import {Collection, Db, DeleteWriteOpResultObject, InsertOneWriteOpResult, UpdateWriteOpResult} from "mongodb";

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
        })).flatMap((r: InsertOneWriteOpResult) => {
            if (r.insertedCount === 0) {
                return Observable.throw("Tenant not inserted");
            }
            return Observable.of(tenant);
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
        })).flatMap((r: UpdateWriteOpResult) => {
            if (r.modifiedCount === 0) {
                return Observable.throw("No tenant found.");
            }
            return Observable.empty();
        });
    }

    public remove(tenant: Tenant): Observable<any> {
        assert(!_.isNull(tenant), "tenant is required");

        return Observable.fromPromise(this.collection().deleteOne({
            tenantId: tenant.tenantId.id,
        })).flatMap((r: DeleteWriteOpResultObject) => {
            if (r.deletedCount === 0) {
                return Observable.throw("No tenant found.");
            }
            return Observable.empty();
        });
    }

    public tenantNamed(name: string): Observable<Tenant> {
        return Observable.fromPromise(this.collection().findOne({
            name,
        })).map((r) => new Tenant(new TenantId(r.tenantId), r.name, r.description, r.active));
    }

    public tenantOfId(tenantId: TenantId): Observable<Tenant> {
        return Observable.fromPromise(this.collection().findOne({
            tenantId: tenantId.id,
        })).map((r) => new Tenant(new TenantId(r.tenantId), r.name, r.description, r.active));
    }

    private collection(): Collection {
        return this.db.collection(TENANTS_COLLECTION);
    }
}
