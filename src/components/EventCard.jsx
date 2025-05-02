import React, { useState } from "react";
import { Clock, Copy, Link } from "lucide-react";
import { Switch } from "./ui/Switch"; // Adjust the import path as necessary
import PropTypes from "prop-types";

const EventCard = ({ event, onToggleActive }) => {
  // Local state to manage the toggle while API updates
  const [isActive, setIsActive] = useState(event.isActive);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(event.path);
    alert("Link copied to clipboard!"); // Can replace with toast notification
  };

  const handleOpenLink = () => {
    window.open(event.path, "_blank");
  };

const handleToggle = (newState) => {
  // Update local state immediately for responsive UI
  setIsActive(newState);

  // Call parent function to update global state/API
  if (onToggleActive) {
    onToggleActive(event.id, newState);
  } else {
    console.log(`Event ${event.id} toggle status: ${newState}`); // Fixed: Added backticks
  }
};

  const handleMoreOptions = () => {
    // Add your more options logic here
    console.log("More options clicked for event:", event.id);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow ">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-6 h-6">
            <Clock className="h-5 w-5 text-[#A4CC02]" />
          </div>
          <h3 className="font-medium text-gray-900">{event.title}</h3>
        </div>
        <Switch
          checked={isActive}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-[#A4CC02]"
        />
      </div>

      <div className="text-sm text-gray-500 mb-4 truncate">{event.path}</div>

      <div className="flex justify-end space-x-2">
        <button
          className="p-2 rounded-md hover:bg-[#E1F395] transition-colors"
          onClick={handleCopyLink}
          title="Copy link"
        >
          <Copy className="h-5 w-5 text-gray-500" />
        </button>

        <button
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={handleOpenLink}
          title="Open link"
        >
          <Link className="h-5 w-5 text-gray-500" />
        </button>

        {isActive && (
          <button
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={handleMoreOptions}
            title="More options"
          >
            <span className="h-5 w-5 text-gray-500 flex items-center justify-center">
              ⋮
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleActive: PropTypes.func,
};

export default EventCard;