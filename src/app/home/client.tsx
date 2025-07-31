// components/header.tsx
'use client';

import TemplateComponent from "@/components/template";
import WizardComponent from "@/components/wizard.component";
import { useState } from "react";
import BusinessStructure from "./components/business.structure";
import ContactPerson from "./components/contact.person";
import ReviewSubmit from "./components/review.submit";
import Company from "@/models/company";
import CompanyContact from "@/models/company.contact";

export default function HomeClient() {
    const [step, setStep] = useState<number>(0);
    const [subTitle, setSubTitle] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false)
    const [company, setCompany] = useState<Company>({
        address: {},
        contact: {}
    } as Company);
    const nextStep = (updateCompany: Company) => {
        const next = step + 1;
        setSubTitle('In progress');
        setCompany(updateCompany);
        setStep(next);
    }

    const onReset = () => {
        setSubTitle('');
        setCompany({
            address: {},
            contact: {}
        } as Company);
        setStep(0);
        setSuccess(false)
    }

    const onComplete = () => {
        setSubTitle('success');
        setSuccess(true);
    }

    return (
        <TemplateComponent subTitleType={subTitle} subTitle={subTitle} title={'New Company'}>
            <WizardComponent stepDisabled={success} currentStep={step} onGoToStep={(step: number) => setStep(step)}>
                <BusinessStructure
                    onContinue={nextStep}
                    company={company}
                    title="Business structure"
                />
                <ContactPerson
                    onContinue={(contact: CompanyContact) => nextStep({...company, contact: contact})}
                    contact={company.contact}
                    title='Contact person'
                />
                <ReviewSubmit
                    company={company}
                    onEditBusiness={() => setStep(0)}
                    onEditContact={() => setStep(1)}
                    onConfirmSubmit={() => onComplete()}
                    onReset={() => onReset()}
                    title="Review & submit" 
                />
            </WizardComponent>
        </TemplateComponent>
    );
}
