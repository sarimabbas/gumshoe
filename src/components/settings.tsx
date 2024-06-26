import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getHandleToDirectory } from "@/lib/files";
import { Cog } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "./ui/badge";

export const Settings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [configHandle, setConfigHandle] =
    useState<FileSystemDirectoryHandle | null>(null);

  const handleConfigurationFile = async () => {
    setConfigHandle(
      await getHandleToDirectory({
        mode: "readwrite",
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
          <Cog className="absolute h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Open settings</span>
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Customize Gumshoe to your liking
            </DialogDescription>
          </DialogHeader>
          {/* select configuration directory  */}
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <span>Configuration directory</span>
              {configHandle && (
                <Badge variant="outline">{configHandle.name}</Badge>
              )}
            </label>
            <Button
              onClick={handleConfigurationFile}
              variant="default"
              size="sm"
              className="w-fit"
            >
              Load configuration
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
