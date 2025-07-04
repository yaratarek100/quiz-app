import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaCalendar } from "react-icons/fa";

interface DatePickerDemoProps {
  className?: string;
  showPlaceholder?: boolean;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

export function DatePickerDemo({
  className,
  showPlaceholder = true,
  value,
  onChange,
}: DatePickerDemoProps) {
  
  const [internalDate, setInternalDate] = useState<Date | null>(null);
  const selectedDate = value ?? internalDate;

  const handleSelect = (date: Date | undefined) => {
    const finalDate = date ?? null;
    if (onChange) {
      onChange(finalDate);
    } else {
      setInternalDate(finalDate); 
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-bold text-black",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <FaCalendar className="mr-2 h-4 w-4 text-black" />
          {selectedDate ? (
            format(selectedDate, "dd/MM/yyyy")
          ) : showPlaceholder ? (
            <span className="text-black">Pick a date</span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate ?? undefined}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}

