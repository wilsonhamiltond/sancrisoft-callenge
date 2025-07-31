'use client';

import ArrowIcon from '@/components/arrow.icon';
import SubmitButton from '@/components/submit.button';
import CompanyContact from '@/models/company.contact';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import contriesJson from '@/data/countries.json';
import PhoneInputComponent from '@/components/phone.input';
import Input from '@/components/input';
import Label from '@/components/label';
import ErrorMessage from '@/components/error.message';
import errorValidate from '@/utils/error.validate';
import hasError from '@/utils/has.error';

const FormContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const NameInputs = styled.div`
  display: flex;
  gap: 15px;

  & > div {
    flex: 1;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

interface InputProps {
  $hasError?: boolean;
}

const PhoneInputGroup = styled.div<InputProps>`
  display: flex;
  border: 1px solid #e0e0e0;
  border: 1px solid ${(props) => (props.$hasError ? '#e74c3c' : '#e0e0e0')};
  border-radius: 8px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: #6a5acd;
    box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.2);
  }
`;

const PhoneNumberInput = styled(Input)`
  flex-grow: 1;
  padding-left: 0px;
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  top: -1px;
  position: relative;
  margin-bottom: -2px;

  &:focus {
    box-shadow: none;
  }
`;

export default function ContactPerson({
  title = '',
  contact,
  onContinue
}: {
  title: string,
  contact?: CompanyContact,
  onContinue: CallableFunction
}) {
  const [formData, setFormData] = useState<CompanyContact>({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+353',
    phone: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form submitted:', formData);
    onContinue(formData);
  };

  useEffect(() => {
    if (!contact) return;
    setFormData(contact)
  }, [contact]);

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="firstName">Name</Label>
          <NameInputs>
            <div>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={formData.firstName || ''}
                onChange={handleChange}
                onBlur={(e) => errorValidate(e, setErrors, errors)}
                $hasError={!!errors['firstName']}
                required
              />
              {errors['firstName'] && <ErrorMessage>{errors['firstName']}</ErrorMessage>}
            </div>
            <div>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName || ''}
                onChange={handleChange}
                onBlur={(e) => errorValidate(e, setErrors, errors)}
                $hasError={!!errors['lastName']}
                required
              />
              {errors['lastName'] && <ErrorMessage>{errors['lastName']}</ErrorMessage>}
            </div>
          </NameInputs>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="your@emailhere.com"
            value={formData.email || ''}
            onChange={handleChange}
            onBlur={(e) => errorValidate(e, setErrors, errors,  [{
                  regx: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Make sure your email is a well formed address'
                }])}
            $hasError={!!errors['email']}
            required
          />
          {errors['email'] && <ErrorMessage>{errors['email']}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Phone</Label>
          <PhoneInputGroup $hasError={!!errors['phone']}>
            <PhoneInputComponent
              options={contriesJson.countries}
              value={formData.countryCode || ''}
              name='countryCode'
              onSelect={handleChange}
            />
            <PhoneNumberInput
              type="tel" // Use type="tel" for phone numbers
              id="phone"
              name="phone"
              placeholder="(555) 000-0000"
              value={formData.phone || ''}
              onChange={handleChange}
              onBlur={(e) => errorValidate(e, setErrors, errors)}
              $hasError={!!errors['phone']}
              required
            />
          </PhoneInputGroup>
          {errors['phone'] && <ErrorMessage>{errors['phone']}</ErrorMessage>}
        </FormGroup>

        <SubmitButton  $isDisabled={hasError(errors)} type="submit">
          Continue <ArrowIcon>&rarr;</ArrowIcon>
        </SubmitButton>
      </form>
    </FormContainer>
  );
};
