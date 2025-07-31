import Company from "@/models/company";

export const setCompanyToLocalStorage = (value: Company): boolean => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem('sc-company', serializedValue);
        return true;
    } catch (error) {
        console.error(`Error setting object to localStorage for key "sc-company":`, error);
        return false;
    }
}

export const getCompanyFromLocalStorage = () =>  {
    try {
        const serializedValue = localStorage.getItem('sc-company');

        if (serializedValue === null) {
            return null;
        }

        // Attempt to parse the JSON string back into an object.
        const parsedValue: Company = JSON.parse(serializedValue);
        return parsedValue;
    } catch (error) {
        console.error(`Error getting or parsing object from localStorage for key "sc-company":`, error);
        return null;
    }
}