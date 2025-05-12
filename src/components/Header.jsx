import React, { useState, useRef, useEffect } from "react";
import { Menu, Settings } from "lucide-react";
import { Button } from "@components/ui/Button";
import NewEventPopup from "@components/ui/NewEventPopup"; // Update path if needed

const Header = ({ toggleSidebar, onCreateNewEvent }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  // Close popup if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-8 px-6 flex items-center justify-between relative">
      {/* Left Side: Sidebar toggle + Titles */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-2xl font-medium mb-1">Event Types</h1>
          <p className="text-[#000000] font-light">
            Create events to share for people to book on your calendar.
          </p>
        </div>
      </div>

      {/* Right Side: Buttons */}
      <div className="flex items-center space-x-4 relative">
        {/* New Event Button */}
        <Button ref={buttonRef} onClick={togglePopup}>
          New Event <span className="ml-2">+</span>
        </Button>

        {/* Settings Button */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings className="h-5 w-5 text-gray-600" />
        </button>

        {/* Event Creation Popup */}
        {showPopup && (
          <div
            ref={popupRef}
            className="absolute right-0 top-full mt-2 z-50 bg-white border border-[#A4CC02] shadow-[4px_4px_0px_0px_rgba(164,204,0,0.51)] rounded-xl"
          >
            <NewEventPopup onCreateNewEvent={onCreateNewEvent} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
