import type{ StepProps } from "../types";

const Step1 = ({ formData, updateFormData, errors }: StepProps) => (
  <div className="steps grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
        First Name
      </label>
      <input
        id="firstName"
        type="text"
        placeholder="e.g., John"
        className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-3 text-white"
        value={formData.firstName || ""}
        onChange={(e) => updateFormData({ firstName: e.target.value })}
      />
      {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
    </div>
    <div>
      <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
        Last Name
      </label>
      <input
        id="lastName"
        type="text"
        placeholder="e.g., Doe"
        className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md p-3 text-white"
        value={formData.lastName || ""}
        onChange={(e) => updateFormData({ lastName: e.target.value })}
      />
      {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
    </div>
    <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 text-white"
          value={formData.email || ''}
          onChange={(e) => updateFormData({ email: e.target.value })}
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone number</label>
        <input
          id="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 text-white"
          value={formData.phone || ''}
          onChange={(e) => updateFormData({ phone: e.target.value })}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
      </div>
    
  </div>
);

export default Step1;
