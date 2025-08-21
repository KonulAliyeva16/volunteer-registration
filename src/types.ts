// Defines the structure of the form data for type safety.
export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string,
    preferredDays?: string[];
    preferredTime?: string;
    locationPreference?: string;
    selectedSkills?: { name: string; rating: number; }[];
  }

 export type SkillCategory = 'Technical' | 'Creative' | 'Communication' | 'Leadership' ;

 export interface Skill {
    id: number;
    category: SkillCategory;
    name: string;
    tools: string;
    icon: {
      symbol: string;
    };
    rating: number;
    circle: string
  }

 export interface SkillRatingProps {
    rating: number;
    onRatingChange: (newRating: number) => void;
  }
  
  // Defines the props for each step component.
  export type StepProps = {
    formData: Partial<FormData>;
    updateFormData: (data: Partial<FormData>) => void;
    errors: Partial<Record<keyof FormData, string>>;
  };