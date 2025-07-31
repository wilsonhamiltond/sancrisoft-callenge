import ArrowIcon from '@/components/arrow.icon';
import SubmitButton from '@/components/submit.button';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import companyJson from '@/data/company_types.json';
import statesJson from '@/data/states.json';
import Company from '@/models/company';
import Select from '@/components/select';
import handleChange from '@/utils/handle.change';
import Input from '@/components/input';
import Label from '@/components/label';
import SectionTitle from '@/components/section.title';
import errorValidate from '@/utils/error.validate';
import ErrorMessage from '@/components/error.message';
import hasError from '@/utils/has.error';


const FormContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const AddressLineGroup = styled.div`
  margin-bottom: 15px;
`;

const CityStateZipGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;

  & > div {
    flex: 1;
  }

  & > div:nth-child(2) {
    flex: 0.7;
  }
  & > div:nth-child(3) {
    flex: 0.7;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;




export default function BusinessStructure({
  title,
  company,
  onContinue
}: {
  title: string,
  company: Company,
  onContinue: CallableFunction
}) {
  const [formData, setFormData] = useState<Company>({
    address: {},
    contact: {}
  } as Company);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onContinue(formData);
  };
  useEffect(() => {
    if (!company) return;
    setFormData(company);
  }, [company]);

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Business name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Registered business name"
            value={formData.name || ''}
            onChange={(e) => handleChange(e, setFormData)}
            onBlur={(e) => errorValidate(e, setErrors, errors)}
            $hasError={!!errors['name']}
            required
          />
          {errors['name'] && <ErrorMessage>{errors['name']}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="type">Type</Label>
          <Select
            id="type"
            name="type"
            value={formData.type || ''}
            onChange={(e) => handleChange(e, setFormData)}
            onBlur={(e) => errorValidate(e, setErrors, errors)}
            $hasError={!!errors['type']}
            required
          >
            <option value="" disabled>Type of business</option>
            {companyJson.company_types.map((company, index) => <option key={index} value={company}>{company}</option>)}
          </Select>
          {errors['type'] && <ErrorMessage>{errors['type']}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <SectionTitle>Address</SectionTitle>
          <AddressLineGroup>
            <Input
              type="text"
              id="address.line1"
              name="address.line1"
              placeholder="Address line 1"
              value={formData.address.line1 || ''}
              onChange={(e) => handleChange(e, setFormData)}
              onBlur={(e) => errorValidate(e, setErrors, errors)}
              $hasError={!!errors['address.line1']}
              required
            />
            {errors['address.line1'] && <ErrorMessage>{errors['address.line1']}</ErrorMessage>}
          </AddressLineGroup>
          <AddressLineGroup>
            <Input
              type="text"
              id="address.line2"
              name="address.line2"
              placeholder="Address line 2 (optional)"
              value={formData.address.line2 || ''}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </AddressLineGroup>
          <AddressLineGroup>
            <Input
              type="text"
              id="address.city"
              name="address.city"
              placeholder="City"
              value={formData.address.city || ''}
              onChange={(e) => handleChange(e, setFormData)}
              onBlur={(e) => errorValidate(e, setErrors, errors)}
              $hasError={!!errors['address.city']}
              required
            />
            {errors['address.city'] && <ErrorMessage>{errors['address.city']}</ErrorMessage>}
          </AddressLineGroup>

          <CityStateZipGroup>
            <div>
              <Select
                id="address.state"
                name="address.state"
                value={formData.address.state || ''}
                onChange={(e) => handleChange(e, setFormData)}
                onBlur={(e) => errorValidate(e, setErrors, errors)}
                $hasError={!!errors['address.state']}
                required
              >
                <option value="" disabled>State</option>
                {statesJson.states.map((state, index) => <option key={index} value={state.abbreviation}>{state.name}</option>)}
              </Select>
              {errors['address.state'] && <ErrorMessage>{errors['address.state']}</ErrorMessage>}
            </div>
            <div>
              <Input
                type="number"
                id="address.zip"
                name="address.zip"
                placeholder="Zip"
                value={formData.address.zip || ''}
                onChange={(e) => handleChange(e, setFormData)}
                onBlur={(e) => errorValidate(e, setErrors, errors, [{
                  regx: /^[0-9]{5}(?:-[0-9]{4})?$/,
                  message: 'Invalid ZIP code format'
                }])}
                $hasError={!!errors['address.zip']}
                required
              />
              {errors['address.zip'] && <ErrorMessage>{errors['address.zip']}</ErrorMessage>}
            </div>
          </CityStateZipGroup>
        </FormGroup>

        <SubmitButton $isDisabled={hasError(errors)} type="submit">
          Continue <ArrowIcon>&rarr;</ArrowIcon>
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

