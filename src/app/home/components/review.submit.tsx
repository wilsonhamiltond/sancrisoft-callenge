import SectionTitle from '@/components/section.title';
import SubmitButton from '@/components/submit.button';
import Company from '@/models/company';
import CompanyAddress from '@/models/company.address';
import React, { useState } from 'react';
import styled from 'styled-components';
import companyCreateApi from '../api/company.create';
import ArrowIcon from '@/components/arrow.icon';
import Message from '@/components/message';

const SummaryContainer = styled.div`
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const EditLink = styled.a`
  font-size: 0.9em;
  color: #6a5acd;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const DetailLabel = styled.span`
  font-size: 1em;
  color: #666666;
  min-width: 80px;
  margin-right: 10px;
`;

const DetailValue = styled.span`
  font-size: 1em;
  color: #333333;
  font-weight: 500;
  white-space: pre-wrap;
`;

const SectionDivider = styled.div`
  margin: 30px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
interface Response {
  status: string;
  message: string;
}

export default function ReviewSubmit({
  title,
  company,
  onEditBusiness,
  onEditContact,
  onConfirmSubmit,
  onReset
}: {
  title: string,
  company: Company,
  onEditBusiness: CallableFunction,
  onEditContact: CallableFunction,
  onConfirmSubmit: CallableFunction,
  onReset: CallableFunction
}) {
  const [response, setResponse] = useState<Response>({} as Response);
  const [loading, setLoading] = useState<boolean>(false)
  const formatAddress = (address: CompanyAddress) => {
    return `${address.line1}\n${address.line2 ? address.line2 + '\n' : ''}${address.city}, ${address.state} ${address.zip}`;
  };

  const onSubmit = async () => {
    setLoading(true);
    companyCreateApi(company).then((res) => {
      setResponse(res);
      onConfirmSubmit();
    }).catch(() => {
      alert('Error creating company');
      setResponse({
        status: 'error',
        message: 'Unexpected error.'
      });
    }).finally(() => {
      setLoading(false);
    })
  }

  const onStartOver = () =>{
    setResponse({} as Response);
    onReset();
  }

  return (
    <SummaryContainer>
      <SectionHeader>
        <SectionTitle>Business structure</SectionTitle>
        {onEditBusiness && response.status !== 'ok' && <EditLink onClick={() => onEditBusiness()}>Edit</EditLink>}
      </SectionHeader>
      <DetailRow>
        <DetailLabel>Name:</DetailLabel>
        <DetailValue>{company.name}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>Type:</DetailLabel>
        <DetailValue>{company.type}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>Address:</DetailLabel>
        <DetailValue>{formatAddress(company.address)}</DetailValue>
      </DetailRow>

      <SectionDivider />

      <SectionHeader>
        <SectionTitle>Contact person</SectionTitle>
        {onEditContact && response.status !== 'ok' && <EditLink onClick={() => onEditContact()}>Edit</EditLink>}
      </SectionHeader>
      <DetailRow>
        <DetailLabel>Name:</DetailLabel>
        <DetailValue>{company.contact?.firstName} {company.contact?.lastName}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>Email:</DetailLabel>
        <DetailValue>{company.contact?.email}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>Phone:</DetailLabel>
        <DetailValue>{company.contact?.phone}</DetailValue>
      </DetailRow>
      <SectionDivider />
      <ButtonContainer>
        {response.status === 'ok' &&
          <Message $type='success'>
            Thanks for submitting your company! We’ll be in touch shortly.
          </Message>}

        {onConfirmSubmit && response.status !== 'ok' && (
          <SubmitButton onClick={() => onSubmit()} disabled={loading}>
            {!loading && <span>Confirm & Submit <ArrowIcon>&rarr;</ArrowIcon></span>}
            {loading && <span>Company Creating...</span>}
          </SubmitButton>
        )}
        {onReset && response.status === 'ok' && (
          <SubmitButton onClick={() => onStartOver()}>
            <span>Start Over <ArrowIcon>&rarr;</ArrowIcon></span>
          </SubmitButton>
        )}
        {response.status === 'error' &&
          <Message $type='error'>
            Thanks for submitting your company! We’ll be in touch shortly.
          </Message>}
      </ButtonContainer>
    </SummaryContainer>
  );
};
