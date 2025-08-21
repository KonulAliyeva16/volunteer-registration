// ConfirmationPage.tsx
import React from 'react';
import type { FC } from 'react';
// import { FaRegCheckCircle } from 'react-icons/fa';
import type { FormData } from '../types';

interface ConfirmationPageProps {
  formData: Partial<FormData>;
}

const SummaryStep: FC<ConfirmationPageProps> = ({ formData }) => {
  const preferredDaysMap: { [key: string]: string } = {
    'monday': 'Mon',
    'tuesday': 'Tue',
    'wednesday': 'Wed',
    'thursday': 'Thu',
    'friday': 'Fri',
    'saturday': 'Sat',
    'sunday': 'Sun',
  };

  const getDaysString = (days?: string[]) => {
    if (!days || days.length === 0) {
      return 'N/A';
    }
    return days.map(day => preferredDaysMap[day.toLowerCase()] || day).join(', ');
  };

  const getTimeRange = (time?: string) => {
    switch (time) {
      case 'morning':
        return '6:00 AM - 12:00 PM';
      case 'afternoon':
        return '12:00 PM - 6:00 PM';
      case 'evening':
        return '6:00 PM - 10:00 PM';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-black/50 text-white rounded-2xl w-full max-w-4xl mx-auto backdrop-blur-md">
      <div className="text-center mb-8">
        <div className="inline-block relative">
          {/* <FaRegCheckCircle className="text-green-500 text-8xl" /> */}
          <div className="absolute -top-2 right-0 bg-yellow-400 text-black rounded-full p-1 text-xs font-bold">
            <span role="img" aria-label="star">⭐</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mt-4 text-white">Registration Complete!</h1>
        <p className="text-gray-300 mt-2">Thank you for joining our volunteer community</p>
        <p className="text-red-500 font-bold mt-4">❤️ Welcome to the team! ❤️</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
        {/* Personal Info Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <img src="/icons/user-circle.png" alt="Personal Info Icon" className="w-6 h-6 mr-2" />
            Personal Info
          </h3>
          <p>
            <span className="font-semibold">Name:</span> {formData.firstName} {formData.lastName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {formData.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {formData.phone}
          </p>
        </div>

        {/* Availability Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <img src="/icons/calendar-check.png" alt="Availability Icon" className="w-6 h-6 mr-2" />
            Availability
          </h3>
          <p>
            <span className="font-semibold">Days:</span> {getDaysString(formData.preferredDays)}
          </p>
          <p>
            <span className="font-semibold">Time:</span> {getTimeRange(formData.preferredTime)}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {formData.locationPreference || 'N/A'}
          </p>
        </div>
        
        {/* Skills & Expertise Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col col-span-full lg:col-span-1">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <img src="/icons/tools.png" alt="Skills Icon" className="w-6 h-6 mr-2" />
            Skills & Expertise
          </h3>
          {formData.selectedSkills && formData.selectedSkills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.selectedSkills.map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-semibold">{skill.name}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${i < skill.rating ? 'bg-purple-500' : 'bg-gray-500'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No skills selected.</p>
          )}
        </div>
      </div>

      <div className="w-full mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">What happens next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-purple-600 rounded-full p-4 mb-3">
              <img src="/icons/email.png" alt="Email Icon" className="w-8 h-8" />
            </div>
            <h4 className="font-semibold text-lg">Email Confirmation</h4>
            <p className="text-sm text-gray-400">You'll receive a confirmation email within 24 hours.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-600 rounded-full p-4 mb-3">
              <img src="/icons/team.png" alt="Team Icon" className="w-8 h-8" />
            </div>
            <h4 className="font-semibold text-lg">Team Assignment</h4>
            <p className="text-sm text-gray-400">We'll match you with projects based on your skills.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-600 rounded-full p-4 mb-3">
              <img src="/icons/start.png" alt="Start Icon" className="w-8 h-8" />
            </div>
            <h4 className="font-semibold text-lg">Start Volunteering</h4>
            <p className="text-sm text-gray-400">Begin making a difference in your community.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;