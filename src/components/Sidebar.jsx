import React from "react";
import { Menu, Calendar, Clock, Search } from "lucide-react";
import { FaLink } from "react-icons/fa";
import { useNavigate, Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ isSidebarOpen, toggleSidebar, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which menu item is active based on the current path
  const isEventTypeActive =
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/event-type";
  const isMeetingsActive = location.pathname === "/dashboard/meetings";
  const isAvailabilityActive = location.pathname === "/dashboard/availability";

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-[230px] transform transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 bg-white border-r-2 border-[#A4CC02]`}
      >
        {/* Profile Section */}
        <div className="flex items-center p-4">
          <Link to="/user-profile" className="flex items-center">
            <img
              src="https://cdn.britannica.com/54/264854-050-1F82F2BF/indian-actor-hrithik-roshan-european-premiere-kites-odeon-west-may-18-2010-london-england.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <h3 className="font-normal font-lexend text-sm">Jason Jay</h3>
            </div>  
          </Link>

          {/* Search Button */}
          <button className="ml-auto p-1.5 rounded-full bg-[#CDF529]">
            <Search className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-4">
          <div className="space-y-4">
            <div
              className={`flex items-center px-2 py-2 text-sm font-normal rounded-md hover:bg-gray-100 cursor-pointer ${
                isEventTypeActive
                  ? "bg-gray-100 text-[#A4CC02]"
                  : "text-[#000000]"
              }`}
              onClick={() => navigate("/dashboard/event-type")}
            >
              <div className="mr-3 w-6">
                <FaLink
                  className={`h-5 w-5 ${
                    isEventTypeActive ? "text-[#A4CC02]" : "text-gray-400"
                  }`}
                />
              </div>
              Event Type
            </div>

            <div
              className={`flex items-center px-2 py-2 text-sm font-normal rounded-md hover:bg-gray-100 cursor-pointer ${
                isMeetingsActive
                  ? "bg-gray-100 text-[#A4CC02]"
                  : "text-[#000000]"
              }`}
              onClick={() => navigate("/dashboard/meetings")}
            >
              <div className="mr-3 w-6">
                <Calendar
                  className={`h-5 w-5 ${
                    isMeetingsActive ? "text-[#A4CC02]" : "text-gray-400"
                  }`}
                />
              </div>
              Meetings
            </div>

            <div
              className={`flex items-center px-2 py-2 text-sm font-normal rounded-md hover:bg-gray-100 cursor-pointer ${
                isAvailabilityActive
                  ? "bg-gray-100 text-[#A4CC02]"
                  : "text-[#000000]"
              }`}
              onClick={() => navigate("/dashboard/availability")}
            >
              <div className="mr-3 w-6">
                <Clock
                  className={`h-5 w-5 ${
                    isAvailabilityActive ? "text-[#A4CC02]" : "text-gray-400"
                  }`}
                />
              </div>
              Availability
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Sidebar;
