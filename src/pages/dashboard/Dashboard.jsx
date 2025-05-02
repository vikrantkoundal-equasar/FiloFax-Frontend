import React, { useState, useEffect } from "react";
// Change these import paths if needed
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import EventCard from "../../components/EventCard";

// Sample event data - normally would come from API
const initialEvents = [
  {
    id: 1,
    title: "30 Min Meeting",
    path: "/asif-khan-tm5thr/30min",
    isActive: true,
  },
  {
    id: 2,
    title: "15 Min Meeting",
    path: "/asif-khan-tm5thr/15min",
    isActive: false,
  },
  {
    id: 3,
    title: "One on One",
    path: "/asif-khan-tm5thr/oneonone",
    isActive: false,
  },
];

const Dashboard = () => {
  const [events, setEvents] = useState(initialEvents);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on load and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Open on desktop, closed on mobile
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle event active status toggle
  const handleToggleActive = (eventId, isActive) => {
    // Update events state
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, isActive } : event
      )
    );

    // In a real app, you would make an API call here
    console.log(
      `API call to update event ${eventId} to ${
        isActive ? "active" : "inactive"
      }`
    );

    // Example API call:
    // fetch(`/api/events/${eventId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ isActive })
    // });
  };

  return (
    <div className="flex min-h-screen bg-[#ffffff]">
      {/* Sidebar Component */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${
          isSidebarOpen && !isMobile ? "lg:ml-[230px]" : ""
        }`}
      >
        {/* Header Component with increased right padding */}
        <div className="lg:pr-28">
          <Header toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area with increased padding on both sides */}
        <main className="flex-1 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-8">
           
            </div>

            {/* Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
