"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatShortDate = (dateStr: string) => {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
};

type DayPickerCarouselProps = {
  sortedDates: string[];
  defaultDate: string;
};

const dispatchDayChange = (dateIso: string) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("day-change", { detail: { date: dateIso } }));
  }
};

export const DayPickerCarousel = ({
  sortedDates,
  defaultDate,
}: DayPickerCarouselProps) => {
  const [selectedDate, setSelectedDate] = React.useState(defaultDate);

  const handleDayClick = (dateIso: string) => {
    setSelectedDate(dateIso);
    dispatchDayChange(dateIso);
  };

  return (
    <nav
      className="day-picker-scroll mb-4 flex flex-nowrap gap-2 overflow-x-auto pb-2"
      aria-label="Seleccionar día"
    >
      {sortedDates.map((dateIso) => (
        <Button
          key={dateIso}
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            "shrink-0 cursor-pointer rounded-md border px-3 py-1.5 text-sm font-medium transition-colors duration-200",
            dateIso === selectedDate
              ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
          )}
          aria-pressed={dateIso === selectedDate}
          aria-label={`Ver partidos del ${formatDate(dateIso)}`}
          onClick={() => handleDayClick(dateIso)}
        >
          {formatShortDate(dateIso)}
        </Button>
      ))}
    </nav>
  );
};
