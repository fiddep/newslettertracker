"use client";

import { useEffect, useState } from "react";

/**
 * React component that takes a date and displays it in users preferred format and timezone
 */
export const DateFormat = ({ date }: { date: number }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(new Intl.DateTimeFormat().format(date));
  }, []);

  return <>{formattedDate}</>;
};
