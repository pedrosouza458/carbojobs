"use client";

import React, { ReactNode } from "react";
interface ScheduleProps {
  children: ReactNode;
}
export default function Schedule({ children }: ScheduleProps) {
  return <div className="md:mx-28 md:my-4">{children}</div>;
}
