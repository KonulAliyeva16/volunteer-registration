import type{ FormData } from "../types";

const SummaryStep = ({ formData }: { formData: FormData }) => (
    <div>
        <h3 className="text-lg font-medium leading-6 text-white">Confirm Your Information</h3>
        <div className="mt-4 border-t border-gray-600 pt-4">
            <dl className="space-y-2">
                <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-400">First Name</dt>
                    <dd className="text-sm text-white">{formData.firstName}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-400">Last Name</dt>
                    <dd className="text-sm text-white">{formData.lastName}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-400">Email</dt>
                    <dd className="text-sm text-white">{formData.email}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-400">Street</dt>
                    <dd className="text-sm text-white">{formData.street}</dd>
                </div>
                 <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-400">City</dt>
                    <dd className="text-sm text-white">{formData.city}</dd>
                </div>
                 <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-400">Zip Code</dt>
                    <dd className="text-sm text-white">{formData.zipCode}</dd>
                </div>
            </dl>
        </div>
    </div>
);
export default SummaryStep;