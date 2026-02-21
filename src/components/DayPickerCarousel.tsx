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
  const s = d.toLocaleDateString("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const todayIso = () => new Date().toISOString().slice(0, 10);

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
  const selectedButtonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    selectedButtonRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [selectedDate]);

  const handleDayClick = (dateIso: string) => {
    setSelectedDate(dateIso);
    dispatchDayChange(dateIso);
  };

  return (
    <nav
      className="day-picker-scroll mb-4 flex flex-nowrap gap-2 overflow-x-auto pb-2"
      aria-label="Seleccionar día"
    >
      {sortedDates.map((dateIso) => {
        const isToday = dateIso === todayIso();
        return (
          <Button
            key={dateIso}
            ref={dateIso === selectedDate ? selectedButtonRef : undefined}
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
            aria-label={`Ver partidos del ${formatDate(dateIso)}${isToday ? " (hoy)" : ""}`}
            onClick={() => handleDayClick(dateIso)}
          >
            <span className="inline-flex items-baseline gap-1.5">
              {isToday && (
                <span
                  className={cn(
                    "text-[11px] font-medium",
                    dateIso === selectedDate
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  Hoy
                </span>
              )}
              <span>{formatShortDate(dateIso)}</span>
            </span>
          </Button>
        );
      })}
    </nav>
  );
};
