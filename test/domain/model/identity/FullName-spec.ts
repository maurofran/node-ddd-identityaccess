import * as chai from "chai";
import FullName from "../../../../src/domain/model/identity/FullName";

const expect = chai.expect;

describe("FullName", () => {
    const fixture = new FullName("Foo", "Baz");
    describe("withChangedFirstName", () => {
        it("should return a new full name with changed first name", () => {
            const res = fixture.withChangedFirstName("Other");

            expect(res.firstName).to.equals("Other");
            expect(res.lastName).to.equals(fixture.lastName);
        });
    });

    describe("withChangedLastName", () => {
        it("should return a new full name with changed last name", () => {
            const res = fixture.withChangedLastName("Other");

            expect(res.firstName).to.equals(fixture.firstName);
            expect(res.lastName).to.equals("Other");
        });
    });
});
