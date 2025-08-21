import type { StepProps } from "../types";

const Step2 = ({ formData, updateFormData, errors }: StepProps) => {
  const days = [
    { short: 'MON', long: 'Monday', value: 'monday', icon: '/icons/night.png' },
    { short: 'TUE', long: 'Tuesday', value: 'tuesday', icon: 'icons/star-2.png' },
    { short: 'WED', long: 'Wednesday', value: 'wednesday', icon: 'icons/thunder.png' },
    { short: 'THU', long: 'Thursday', value: 'thursday', icon: 'icons/fire.png' },
    { short: 'FRI', long: 'Friday', value: 'friday', icon: 'icons/rocket.png' },
    { short: 'SAT', long: 'Saturday', value: 'saturday', icon: 'icons/heart-2.png' },
    { short: 'SUN', long: 'Sunday', value: 'sunday', icon: 'icons/formula.png' },
  ];

  const times = [
    { time: 'Morning', clock: '6AM-12PM', icon: '/icons/sun.png', value: 'morning', badge: 'Early bird' },
    { time: 'Afternoon', clock: '12PM-6PM', icon: 'icons/cloudy-day.png', value: 'afternoon', badge: 'Peak time' },
    { time: 'Evening', clock: '6pm-10PM', icon: 'icons/moon.png', value: 'evening', badge: 'Night owl' },
  ];

  const locationOptions = [
    {
      value: "hybrid",
      label: "Hybrid",
      icon: "/icons/hybrid-work.png",
    },
    {
      value: "remote",
      label: "Remote/Virtual",
      icon: "/icons/home.png",
    },
    {
      value: "on-site",
      label: "On-site/Physical",
      icon: "/icons/office.png",
    },
  
  ];

  const toggleDay = (dayValue: string) => {
    const currentDays = formData.preferredDays || [];
    let newDays: string[];

    if (currentDays.includes(dayValue)) {
      newDays = currentDays.filter(d => d !== dayValue);
    } else {
      newDays = [...currentDays, dayValue];
    }

    updateFormData({ preferredDays: newDays });
  };
  const handleLocationChange = (location: string) => {
    updateFormData({ locationPreference: location });
  };

  const handleTimeChange = (timeValue: string) => {
    updateFormData({ preferredTime: timeValue });
  };

  const getBadgeStyle = (badgeText: string) => {
    switch (badgeText) {
      case 'Early bird':
        return 'badge-m';
      case 'Peak time':
        return 'badge-a';
      case 'Night owl':
        return 'badge-e';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="flex flex-col preferences-container">
      <div>
        <label className="block text-sm font-medium text-gray-300">
          <img className="preferences" src="/icons/calendar.png" alt="calendar" /> Preferred Days *
        </label>
        <p className="text-xs text-gray-400 mt-1 mb-3">Select all days that work for you</p>

        <div className="grid grid-cols-7 gap-2 days">
          {days.map(day => (
            <button
              key={day.value}
              type="button"
              className={`flex flex-col gap-4 items-center justify-center p-2 rounded-md transition-all ${formData.preferredDays?.includes(day.value)
                ? 'selected-day'
                : ''
                }`}
              onClick={() => toggleDay(day.value)}
            >
              <img src={day.icon} alt={day.value} />
              <span className="text-xs font-bold">{day.short}</span>
              <span className="text-[10px] mt-1">{day.long}</span>
            </button>
          ))}
        </div>

        {errors.preferredDays && (
          <p className="mt-2 text-sm text-red-400">{errors.preferredDays}</p>
        )}
      </div>
      <div>


        <label className="block text-sm font-medium text-gray-300">
          <img className="preferences" src="/icons/time.png" alt="time" />  Time Preference *
        </label>
        <p className="text-xs text-gray-400 mt-1 mb-3">Select your preferred time of day</p>
        <div className="grid grid-cols-3 gap-2 times">
          {times.map(time => (
            <button
              key={time.value}
              type="button"
              className={`flex flex-col m-4 gap-4 items-center justify-center p-2 ${formData.preferredTime === time.value
                ? 'selected-day'
                : ''
                }`}
              onClick={() => handleTimeChange(time.value)}
            >
              <img src={time.icon} alt={time.value} />
              <span className="text-xs font-bold">{time.time}</span>
              <span className="text-[10px] mt-1">{time.clock}</span>
              <div className={`badge ${getBadgeStyle(time.badge)}`}>{time.badge}</div>
            </button>
          ))}
        </div>
        {errors.preferredTime && (
          <p className="mt-2 text-sm text-red-400">{errors.preferredTime}</p>
        )}
      </div>

      <div className="flex flex-col space-y-6">
        <div>
          <label className="block text-lg font-bold mb-4 text-gray-300">
            <img
              className="preferences w-6 h-6 inline-block mr-2"
              src="/icons/location-pin.png"
              alt="location"
            />
            Location Preference
          </label>
          <div className="location grid grid-cols-3 gap-4">
            {locationOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`
                flex flex-col items-center justify-center p-8 rounded-xl transition-all
                ${formData.locationPreference === option.value
                    ? "selected-day"
                    : ""
                  }
              `}
                onClick={() => handleLocationChange(option.value)}
              >
                <img
                  src={option.icon}
                  alt={option.label}
                  className="w-12 h-12 mb-4"
                />
                <span className="text-sm font-semibold">{option.label}</span>
              </button>
            ))}
          </div>
          {errors.locationPreference && (
            <p className="mt-2 text-sm text-red-400">{errors.locationPreference}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;