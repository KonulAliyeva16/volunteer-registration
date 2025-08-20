import React from 'react';

interface Step {
  number: number;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (stepNumber: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onStepChange }) => {
  return (
    <div className="stepper-container">
      <div className="stepper">
        {steps.map((step) => (
          <div 
            key={step.number} 
            className={`step ${currentStep === step.number ? 'active' : ''} ${step.number <= currentStep ? 'completed' : ''}`}
            onClick={() => onStepChange(step.number)}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;