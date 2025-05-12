import React, { useState } from "react";
import meet from "../../assets/meet.svg";
import zoom from "../../assets/zoom.svg";
import { ChevronDown, ChevronLeft, X } from "lucide-react";

const LocationSelector = ({ onLocationChange, initialLocation = null }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [location, setLocation] = useState(initialLocation);

  const locationOptions = [
    {
      id: "google_meet",
      name: "Google Meet",
      icon: <img src={meet} alt="Google Meet" className="w-6 h-6" />,
    },
    {
      id: "zoom",
      name: "Zoom",
      icon: <img src={zoom} alt="Zoom" className="w-6 h-6" />,
    },
  ];

  const handleOptionClick = (option) => {
    setLocation(option);
    if (onLocationChange) onLocationChange(option);
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="w-full">
      {/* Location selector */}
      <div
        className="flex justify-between items-center py-8 cursor-pointer"
        onClick={toggleOptions}
      >
        <div>
          <p className="text-sm font-semibold text-black">Location</p>
          {location ? (
            <p className="text-xs text-gray-500 mt-1">{location.name}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Select a location</p>
          )}
        </div>
        <span className="text-black font-light text-2xl">
          {showOptions ? <ChevronDown size={24}/> : <ChevronLeft size={24}/>}
        </span>
      </div>

      {/* Location options */}
      {showOptions && (
        <div className="py-4 bg-white">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-3">
              {locationOptions.map((option) => (
                <button
                  key={option.id}
                  className={`px-4 py-2 rounded-full border flex items-center gap-2 ${
                    location && location.id === option.id
                      ? "border-lime-500 bg-lime-50"
                      : "border-lime-200 hover:bg-lime-50"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  <span className="flex items-center justify-center">
                    {option.icon}
                  </span>
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Border line after options */}
      <div className="border-b border-[#0F575C2B]"></div>
    </div>
  );
};

export default LocationSelector;
