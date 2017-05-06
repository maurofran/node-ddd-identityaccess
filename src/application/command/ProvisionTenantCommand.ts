/**
 * Command issued to provision a new tenant.
 */
export default class ProvisionTenantCommand {
    public tenantName: string;
    public tenantDescription: string;

    public administratorFirstName: string;
    public administratorLastName: string;

    public emailAddress: string;
    public primaryTelephone: string;
    public secondaryTelephone: string;

    public addressStreetName: string;
    public addressBuildingNumber: string;
    public addressPostalCode: string;
    public addressCity: string;
    public addressStateProvince: string;
    public addressCountryCode: string;
}
