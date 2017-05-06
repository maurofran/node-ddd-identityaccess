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

    /**
     * Change the email address part of contact information.
     *
     * @param emailAddress - the new e-mail address
     * @returns {ContactInformation} - the new contact information.
     */
    public changeEmailAddress(emailAddress: EmailAddress): ContactInformation {
        return new ContactInformation(emailAddress, this.postalAddress, this.primaryTelephone, this.secondaryTelephone);
    }

    /**
     * Change the postal address part of contact information.
     *
     * @param postalAddress - the new postal address
     * @returns {ContactInformation} - the new contact information
     */
    public changePostalAddress(postalAddress: PostalAddress): ContactInformation {
        return new ContactInformation(this.emailAddress, postalAddress, this.primaryTelephone, this.secondaryTelephone);
    }

    /**
     * Change the primary telephone part of contact information.
     *
     * @param primaryTelephone - the new primary telephone
     * @returns {ContactInformation} - the new contact information
     */
    public changePrimaryTelephone(primaryTelephone: Telephone): ContactInformation {
        return new ContactInformation(this.emailAddress, this.postalAddress, primaryTelephone, this.secondaryTelephone);
    }

    /**
     * Change the secondary telephone part of contact information.
     *
     * @param secondaryTelephone - the new secondary telephone
     * @returns {ContactInformation} - the new contact information
     */
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
