import React, { useCallback, useMemo, useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import SummaryStep from './components/SummaryStep';
import Stepper from './components/Stepper';
import type { FormData } from './types';

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;
  const stepperSteps = useMemo(
    () => [
      { number: 1, label: 'Personal Info', heading: 'Tell us about yourself' },
      { number: 2, label: 'Aviability', heading: 'When are you available?' },
      { number: 3, label: 'Interests', heading: 'Choose your interests' }, // add heading to avoid undefined
      { number: 4, label: 'Submit', heading: 'Review & Submit' },
    ],
    []
  );

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData(prev => {
      let changed = false;
      for (const k in data) {
        // @ts-ignore
        if (prev[k] !== data[k]) { changed = true; break; }
      }
      return changed ? { ...prev, ...data } : prev;
    });
  }, []);

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
    }
    setErrors(prev => {
      const prevKeys = Object.keys(prev);
      const nextKeys = Object.keys(newErrors);
      const sameLen = prevKeys.length === nextKeys.length;
      const same = sameLen && nextKeys.every(k => prev[k as keyof FormData] === newErrors[k as keyof FormData]);
      return same ? prev : newErrors;
    });
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep() && step < totalSteps) setStep(s => s + 1);
  };
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      console.log('Form Submitted:', formData);
      setIsSubmitted(true);
      setStep(4);
    }
  }
  


  const handleReset = () => {
    setStep(1);
    setFormData({ firstName: '', lastName: '', email: '', phone: '' });
    setErrors({});
    setIsSubmitted(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 2: return <Step2 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 3: return <Step3 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 4: return <SummaryStep formData={formData} />;
      default: return null;
    }
  };

  return (
    <div className="main min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="form-content w-full max-w-2xl bg-gray-800 p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-2">{stepperSteps[step - 1].heading}</h2>

        <div className="mb-8">
          <Stepper
            steps={stepperSteps}
            currentStep={step}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-6">
            {step < 3 && (
              <>
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="btn-step prev"
                >
                  Back
                </button>

                <button type="button" onClick={nextStep} className="btn-step next">
                  Next
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-step prev"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-step next"
                >
                  Submit
                </button>
              </>
            )}

            {step === 4 && (
              <div className="w-full text-center text-gray-400 italic">
                Review only
              </div>
            )}
          </div>


        </form>

        {isSubmitted && (
          <div className="mt-6 text-center">
            <button onClick={handleReset} className="underline text-sm">Create Another Registration</button>
          </div>
        )}
      </div>
    </div>
  );
}
