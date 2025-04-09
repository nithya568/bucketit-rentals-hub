
import React from 'react';
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";

interface AvailabilityToggleProps {
  showOnlyAvailable: boolean;
  onChange: (value: boolean) => void;
}

const AvailabilityToggle = ({ showOnlyAvailable, onChange }: AvailabilityToggleProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-background rounded-md border hover:shadow-md transition-all duration-300">
      <Label htmlFor="availability-toggle" className="cursor-pointer">
        Show only available items
      </Label>
      <Toggle
        id="availability-toggle"
        pressed={showOnlyAvailable}
        onPressedChange={onChange}
        variant="outline"
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        aria-label="Toggle availability filter"
      >
        {showOnlyAvailable ? 'On' : 'Off'}
      </Toggle>
    </div>
  );
};

export default AvailabilityToggle;
