// components/template.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StepProgressIndicator, { Step } from './step.indicator';

const Wizard = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 50px;
`;

interface StepProps {
  $actived?: boolean;
}
const StepComponent = styled.div<StepProps>`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    display: ${(props) => (props.$actived ? 'block' : 'none')};
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    padding: 0 38px;
`;

interface WizardProps {
    //title: string;
    children?: React.ReactNode;
    currentStep: number;
    onGoToStep: CallableFunction;
    stepDisabled: boolean;
}

export default function WizardComponent(props: WizardProps) {
    const [steps, setSteps] = useState<Step[]>([]);

    const children = React.Children.toArray(props.children);

    useEffect(() => {
        const allStep = children.map((child, index) => ({
            id: index,
            text: (child as any).props.title
        })) as Step[];
        setSteps(allStep);
    }, []);

    return (
        <Wizard>
            <StepProgressIndicator disabled={props.stepDisabled} onGoToStep={props.onGoToStep} steps={steps} currentStepId={props.currentStep} />
            <Container>
                {children.map((step, index) => <StepComponent key={index} $actived={index === props.currentStep}>{step}</StepComponent>)}
            </Container>
        </Wizard>
    );
}
