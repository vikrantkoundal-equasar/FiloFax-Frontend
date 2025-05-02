import React from "react";
import { Menu, Settings } from "lucide-react";
import { Button } from "@components/ui/button";

const Header = ({ toggleSidebar }) => {
return (
    <header className="bg-white border-b border-gray-200 py-8 px-6 flex items-center justify-between">
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

        <div className="flex items-center space-x-4">
            <Button >
                New Event <span className="ml-2">+</span>
            </Button>
            <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-5 w-5 text-gray-600" />
            </button>
        </div>
    </header>
);
};

export default Header;
