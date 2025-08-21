import React, { useState } from 'react';
// import './App.css';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import SummaryStep from './components/SummaryStep';
import Stepper from './components/Stepper';
import type { FormData } from './types';

export default function App() {
  // State for the current step and form data
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Total number of steps in the form
  const totalSteps = 4;

  // Stepper steps configuration
  const stepperSteps = [
    { number: 1, label: 'Personal Info' ,heading: 'Tell us about yourself'},
    { number: 2, label: 'Aviability', heading: 'When are you available?'},
    { number: 3, label: 'Interests' },
    { number: 4, label: 'Review & Submit' },
  ];

  // Function to update form data as the user types
  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  
  // Validation logic for each step
  const validateStep = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required.';
      if (!formData.lastName) newErrors.lastName = 'Last name is required.';
      if (!formData.phone) newErrors.phone = 'Phone number is required.';
      if (!formData.email) {
        newErrors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid.';
      }
    } else if (step === 2) {
      if (!formData.preferredDays || formData.preferredDays.length === 0) {
        newErrors.preferredDays = 'Please select at least one preferred day.';
      }
      if (!formData.preferredTime) {
        newErrors.preferredTime = 'Please select a preferred time.';
      }
      if (!formData.locationPreference) {
        newErrors.locationPreference = 'Please select a location preference.';
      }
    } else if (step === 3) {
     
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation: Go to the next step
  const nextStep = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1);
      }
    }
  };

  // Navigation: Go to the previous step
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle step change from stepper component
  const handleStepChange = (stepNumber: number) => {
    // Only allow navigation to completed steps
    if (stepNumber < step) {
      setStep(stepNumber);
    }
    // For future steps, require validation
    else if (stepNumber > step && validateStep()) {
      setStep(stepNumber);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      console.log('Form Submitted:', formData);
      setIsSubmitted(true);
    }
  };

  // Reset form to initial state
  const handleReset = () => {
    setStep(1);
    setFormData({
      firstName: '', lastName: '', email: '',
     phone: '',
    });
    setErrors({});
    setIsSubmitted(false);
  }

  // Render the correct step component based on the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 4:
        return <SummaryStep formData={formData} />;
      default:
        return null;
    }
  };
  
  // if (isSubmitted) {
  //   return (
  //     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
  //       <div className="w-full max-w-lg p-8 rounded-xl shadow-2xl text-center">
  //         <h2 className="text-3xl font-bold text-green-400 mb-4">Success!</h2>
  //         <p className="text-gray-300 mb-6">Your registration has been submitted successfully.</p>
  //         <button
  //           onClick={handleReset}
  //           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition-colors duration-300"
  //         >
  //           Create Another Registration
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="main min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="form-content w-full max-w-2xl bg-gray-800 p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-2">{stepperSteps[step - 1].heading}</h2>
        {/* <p className="text-center text-gray-400 mb-6">Step {step} of {totalSteps}</p> */}

        {/* Stepper */}
        <div className="mb-8">
          <Stepper 
            steps={stepperSteps} 
            currentStep={step} 
            onStepChange={handleStepChange}
          />
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className=" space-y-6">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="btn-step prev"
            >
              Back
            </button>
            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-step next"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-800 transition-colors duration-300"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}