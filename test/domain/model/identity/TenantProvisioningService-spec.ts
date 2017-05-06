import * as chai from "chai";
import * as sinon from "sinon";
import * as uuid from "uuid";

import EmailAddress from "../../../../src/domain/model/identity/EmailAddress";
import FullName from "../../../../src/domain/model/identity/FullName";
import ITenantRepository from "../../../../src/domain/model/identity/ITenantRepository";
import PostalAddress from "../../../../src/domain/model/identity/PostalAddress";
import Telephone from "../../../../src/domain/model/identity/Telephone";
import Tenant from "../../../../src/domain/model/identity/Tenant";
import TenantId from "../../../../src/domain/model/identity/TenantId";
import TenantProvisioningService from "../../../../src/domain/model/identity/TenantProvisioningService";

import {Observable} from "@reactivex/rxjs";

const expect = chai.expect;

describe("TenantProvisioningService", () => {
    const tenantRepository = {} as ITenantRepository;
    tenantRepository.nextIdentity = sinon.stub().returns(Observable.of(new TenantId(uuid.v4())));

    const fullName = new FullName("Foo", "Bar");
    const emailAddress = new EmailAddress("foo.bar@streamtune.io");
    const postalAddress = new PostalAddress("6th Street", "123", "32904", "Melbourne", "FL", "US");
    const primaryTel = new Telephone("00123456789");
    const secondaryTel = new Telephone("98765432100");

    const fixture = new TenantProvisioningService(tenantRepository);

    describe("provisionTenant", () => {
        it("should fail observable when tenant name is null", (done: MochaDone) => {
            fixture.provisionTenant(null, "Streamtune", fullName, emailAddress, postalAddress, primaryTel, secondaryTel)
                .subscribe(
                    (t) => expect.fail(),
                    (err) => {
                        expect(err.toString()).to.equals("AssertionError: name is required");
                        done();
                    },
                    done);
        });

        it("should fail observable when tenant description is null", (done: MochaDone) => {
            fixture.provisionTenant("streamtune", null, fullName, emailAddress, postalAddress, primaryTel, secondaryTel)
                .subscribe(
                    (t) => expect.fail(),
                    (err) => {
                        expect(err.toString()).to.equals("AssertionError: description is required");
                        done();
                    },
                    done);
        });

        it("should return the newly provisioned tenant", (done: MochaDone) => {
            tenantRepository.add = sinon.stub().callsFake((t: Tenant) => {
                return Observable.of(t);
            });

            fixture.provisionTenant("streamtune", "Streamtune",
                                    fullName, emailAddress, postalAddress, primaryTel, secondaryTel)
                .subscribe(
                    (t) => {
                        expect(t.tenantId).is.not.equal(null);
                        expect(t.name).is.equal("streamtune");
                        expect(t.description).is.equal("Streamtune");
                        expect(t.active).is.equal(true);
                    },
                    (err) => {
                        expect(err).to.be.null("Error");
                        done();
                    },
                    done);
        });
    });
});
