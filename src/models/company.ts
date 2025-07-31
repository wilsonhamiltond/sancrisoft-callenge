import CompanyAddress from "./company.address"
import CompanyContact from "./company.contact";

interface Company {
    name: string;
    type: string;
    address: CompanyAddress;
    contact?: CompanyContact;
}

export default Company;