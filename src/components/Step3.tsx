import type { StepProps } from "../types";

const Step3 = ({ formData, updateFormData, errors }: StepProps) => (
    <div className="flex flex-col space-y-4">
      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-300">Street Address</label>
        <input
          id="street"
          type="text"
          placeholder="123 Main St"
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 text-white"
          value={formData.street || ''}
          onChange={(e) => updateFormData({ street: e.target.value })}
        />
        {errors.street && <p className="mt-1 text-sm text-red-400">{errors.street}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-300">City</label>
          <input
            id="city"
            type="text"
            placeholder="New York"
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 text-white"
            value={formData.city || ''}
            onChange={(e) => updateFormData({ city: e.target.value })}
          />
          {errors.city && <p className="mt-1 text-sm text-red-400">{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300">ZIP / Postal Code</label>
          <input
            id="zipCode"
            type="text"
            placeholder="10001"
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 text-white"
            value={formData.zipCode || ''}
            onChange={(e) => updateFormData({ zipCode: e.target.value })}
          />
          {errors.zipCode && <p className="mt-1 text-sm text-red-400">{errors.zipCode}</p>}
        </div>
      </div>
    </div>
  );

  export default Step3;