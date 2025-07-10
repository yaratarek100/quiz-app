import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type Calendar24Props = {
  value: Date | undefined;
  onChange: (val: Date | undefined) => void;
};

export function Calendar24({ value, onChange }: Calendar24Props) {
  const [open, setOpen] = React.useState(false);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    if (!value) return;
    const updated = new Date(value);
    updated.setHours(hours);
    updated.setMinutes(minutes);
    onChange(updated);
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-32 justify-between font-normal"
            >
              {value ? value.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (!date) return;
                const updated = new Date(date);
                if (value) {
                  updated.setHours(value.getHours());
                  updated.setMinutes(value.getMinutes());
                }
                onChange(updated);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="time"
          step="60"
          value={
            value
              ? `${String(value.getHours()).padStart(2, "0")}:${String(
                  value.getMinutes()
                ).padStart(2, "0")}`
              : ""
          }
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
}
