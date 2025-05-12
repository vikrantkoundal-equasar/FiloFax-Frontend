import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import EventCard from "../../components/EventCard";
import EventDetailDrawer from "../../components/eventDrawer/EventDetailDrawer";
// Import your page components
import Meetings from "./Meetings"; // Import your existing component
import Availability from "./Availability"; // Import your existing component

// Sample event data - normally would come from API
const initialEvents = [
  {
    id: 1,
    title: "30 Min Meeting",
    path: "/asif-khan-tm5thr/30min",
    isActive: true,
  },
];

const Dashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(initialEvents);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if the current page is event-type
  const isEventTypePage =
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/event-type";

  const handleCardClick = (event) => {
    setSelectedEvent(event); // open drawer
  };

  const closeDrawer = () => {
    setSelectedEvent(null); // close drawer
  };

  // Screen size check
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // open by default on desktop
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleToggleActive = (eventId, isActive) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, isActive } : event
      )
    );

    console.log(
      `API call to update event ${eventId} to ${
        isActive ? "active" : "inactive"
      }`
    );
  };

  const handleCreateNewEvent = () => {
    const newId = events.length + 1;
    const newEvent = {
      id: newId,
      title: "One-on-One Meeting",
      path: `/new-event-${newId}`,
      isActive: false,
    };
    setEvents([...events, newEvent]);
  };

  // EventType page content - this is your current dashboard content
  const EventTypeContent = () => (
    <>
      <div className="mb-8"></div>
      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onToggleActive={handleToggleActive}
            onClick={() => handleCardClick(event)}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Main Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen && !isMobile ? "lg:ml-[230px]" : ""
        }`}
      >
        {/* Header - Only render for Event Type page */}
        {isEventTypePage && (
          <div className="lg:pr-28">
            <Header
              toggleSidebar={toggleSidebar}
              onCreateNewEvent={handleCreateNewEvent}
            />
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto w-full">
            <Routes>
              {/* Default route redirects to event-type */}
              <Route
                path="/"
                element={<Navigate to="/dashboard/event-type" replace />}
              />

              {/* Event Type page (default) */}
              <Route path="/event-type" element={<EventTypeContent />} />

              {/* Meetings page */}
              <Route path="/meetings" element={<Meetings />} />

              {/* Availability page */}
              <Route path="/availability" element={<Availability />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Right-side Drawer */}
      {selectedEvent && (
        <EventDetailDrawer
          event={selectedEvent}
          onClose={closeDrawer}
          onToggleActive={handleToggleActive}
        />
      )}
    </div>
  );
  0;
};

export default Dashboard;
