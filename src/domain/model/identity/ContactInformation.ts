import * as assert from "assert";
import * as _ from "lodash";

import EmailAddress from "./EmailAddress";
import PostalAddress from "./PostalAddress";
import Telephone from "./Telephone";

/**
 * ContactInformation is the value object for person contact information.
 */
export default class ContactInformation {
    constructor(public readonly emailAddress: EmailAddress,
                public readonly postalAddress: PostalAddress,
                public readonly primaryTelephone: Telephone,
                public readonly secondaryTelephone: Telephone) {
        assert(!_.isNull(emailAddress), "emailAddress is required");
        assert(!_.isNull(postalAddress), "postalAddress is required");
        assert(!_.isNull(primaryTelephone), "primaryTelephone is required");
    }

    public changeEmailAddress(emailAddress: EmailAddress): ContactInformation {
        return new ContactInformation(emailAddress, this.postalAddress, this.primaryTelephone, this.secondaryTelephone);
    }

    public changePostalAddress(postalAddress: PostalAddress): ContactInformation {
        return new ContactInformation(this.emailAddress, postalAddress, this.primaryTelephone, this.secondaryTelephone);
    }

    public changePrimaryTelephone(primaryTelephone: Telephone): ContactInformation {
        return new ContactInformation(this.emailAddress, this.postalAddress, primaryTelephone, this.secondaryTelephone);
    }

    public changeSecondaryTelephone(secondaryTelephone: Telephone): ContactInformation {
        return new ContactInformation(this.emailAddress, this.postalAddress, this.primaryTelephone, secondaryTelephone);
    }

    public equals(other: any): boolean {
        return other instanceof ContactInformation && this.emailAddress.equals(other.emailAddress) &&
            this.postalAddress.equals(other.postalAddress) &&
            this.primaryTelephone.equals(other.primaryTelephone) &&
            ((_.isNull(this.secondaryTelephone) && _.isNull(other.secondaryTelephone)) ||
            (!_.isNull(this.secondaryTelephone) && this.secondaryTelephone.equals(other.secondaryTelephone)));
    }

    public toString(): string {
        return "ContactInformation [emailAddress=" + this.emailAddress + ", postalAddress=" + this.postalAddress +
                ", primaryTelephone=" + this.primaryTelephone + ", secondaryTelephone=" + this.secondaryTelephone + "]";
    }
}
