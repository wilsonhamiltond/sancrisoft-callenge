// components/step.indicator.tsx
'use client';

import React from 'react';
import styled from 'styled-components';

const StepIndicatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  box-sizing: border-box;
`;

interface StepItemProps {
  $isActive?: boolean;
  $isCompleted?: boolean;
  $disabled?: boolean;
}

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;
  padding: 15px 0px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StepCilcleItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  background: #D9D9D970;
  border-top-right-radius: 5px;
  border-radius: 21px;
  padding: 5px;
  max-height: fit-content;
`;

const StepStatusCircle = styled.div<StepItemProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
  font-weight: 600;
  flex-shrink: 0;


  ${(props) =>
    props.$isCompleted && !props.$disabled
      ? `
    background-color: #82e0aa;
    color: #28a745;
    font-size: 1.2em;
    cursor: pointer;
    &:hover {
      background-color: #5a4acb;
      box-shadow: 0 4px 15px rgba(106, 90, 205, 0.3);
    }
  `
      : props.$isActive
        ? `
    background-color: #6a5acd;
    color: #ffffff;
  `
        : `
    background-color: #e0e0e0;
    color: #333333;
  `}
  transition: background-color 0.2s ease, color 0.2s ease;
`;

const StepText = styled.span<StepItemProps>`
  font-size: 1em;
  color: ${(props) => (props.$isActive ? '#333333' : '#666666')};
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  width: 100%;

  ${(props) =>
    props.$isCompleted && !props.$disabled
      ? `
    cursor: pointer;
    &:hover {
      color: #5a4acb;
    }
  `: ''}`;

export interface Step {
  id: number;
  text: string;
}

interface StepProgressIndicatorProps {
  steps: Step[];
  currentStepId: number;
  onGoToStep: CallableFunction;
  disabled: boolean;
}

export default function StepProgressIndicator(props: StepProgressIndicatorProps) {
  const onGoTo = (step: number, isCompleted: boolean) =>{
    if(!isCompleted || props.disabled) return;
    props.onGoToStep(step);
  }
  return (
    <StepIndicatorContainer>
      <StepCilcleItem>
        {props.steps.map((step) => {
          const isCompleted = step.id < props.currentStepId;
          const isActive = step.id === props.currentStepId;
          return (
            <StepStatusCircle 
              onClick={() => onGoTo(step.id, isCompleted)}
              key={step.id} 
              $disabled={props.disabled}
              $isCompleted={isCompleted} 
              $isActive={isActive}>
              {isCompleted ? '✓' : (step.id + 1)}
            </StepStatusCircle>
          );
        })}
      </StepCilcleItem>
      <StepItem>
        {props.steps.map((step) => {
          const isActive = step.id === props.currentStepId;
          const isCompleted = step.id < props.currentStepId;
          return (
            <StepText 
              $disabled={props.disabled}
              onClick={() => onGoTo(step.id, isCompleted)}
              $isCompleted={isCompleted} key={step.id} $isActive={isActive}>
              {step.text}
            </StepText>
          );
        })}
      </StepItem>
    </StepIndicatorContainer>
  );
};
