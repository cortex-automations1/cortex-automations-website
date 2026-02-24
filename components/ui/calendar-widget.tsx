"use client";

import Script from "next/script";
import { CAL_LINK } from "@/lib/constants";

export function CalendarWidget() {
  return (
    <>
      <div
        id="calendar-inline-widget"
        data-calendar-link={CAL_LINK}
        style={{ position: "relative", minWidth: "330px", height: "600px" }}
      />
      <Script src="https://assets.calendar.com/widget.js" strategy="afterInteractive" />
    </>
  );
}
