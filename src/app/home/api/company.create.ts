import Company from "@/models/company";

  const companyCreateApi = async (company: Company) => {
    try {
      const response = await fetch('https://ss-company.free.beeceptor.com/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
      });

      const result = await response.json();

      return result;
    } catch (error) {
      console.error('Failed:', error);
      return {
        status: 'error',
        message: 'Unexpected error.'
      }
    }
  };

  export default companyCreateApi;
