// Defines the structure of the form data for type safety.
export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string,
    street: string;
    city: string;
    zipCode: string;
    preferredDays?: string[];
    preferredTime?: string;
    locationPreference?: string;
  }
  
  // Defines the props for each step component.
  export type StepProps = {
    formData: Partial<FormData>;
    updateFormData: (data: Partial<FormData>) => void;
    errors: Partial<Record<keyof FormData, string>>;
  };