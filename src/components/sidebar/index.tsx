import React from "react";
import { ModeToggle } from "../mode-toggle";
import { ScrollArea } from "../ui/scroll-area";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Settings } from "../settings";

const Sidebar: React.FC = () => {
  const handleAddLocation = () => {};

  return (
    <ScrollArea className="h-full p-4 bg-yellow-200">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span>Locations</span>
          <Button
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-md shadow-md"
            onClick={handleAddLocation}
          >
            <Plus size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ModeToggle />
          <Settings />
        </div>
      </div>
    </ScrollArea>
  );
};

export { Sidebar };
