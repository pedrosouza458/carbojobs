"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Hours } from "@/enums/hours";
import { Days } from "@/enums/days";
import { useEffect, useState } from "react";
import { getProfile } from "@/http/get-profile";
import { Button } from "@/components/ui/button";
import { updateSchedule } from "@/http/update-schedule";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useFormState } from "@/hooks/use-form-state";
import { updateScheduleAction } from "./action";
import { useRouter } from "next/navigation";

export default function ScheduleForm() {
  const [selectedHours, setSelectedHours] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const user = await getProfile();
      const userHours = user.reduce(
        (acc: { [key: string]: boolean }, curr: any) => {
          curr.hours.forEach((hour: string) => {
            acc[hour] = true;
          });
          return acc;
        },
        {}
      );
      const userDays = user.reduce(
        (acc: { [key: string]: boolean }, curr: any) => {
          curr.days.forEach((day: string) => {
            acc[day] = true;
          });
          return acc;
        },
        {}
      );
      setSelectedHours(userHours);
      setSelectedDays(userDays);
    };

    getUser();
  }, []);

  const handleHourChange = (hour: string) => {
    setSelectedHours((prevSelectedHours) => ({
      ...prevSelectedHours,
      [hour]: !prevSelectedHours[hour],
    }));
  };

  const handleDayChange = (day: string) => {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }));
  };

  const router = useRouter();

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    updateScheduleAction,
    () => {
      toast({
        title: "Horários Alterados",
      });
      router.push("/schedules");
    }
  );

  return (
    <div className="md:mx-40 md:my-4 mx-10">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h1>Dias disponíveis</h1>
            {Object.values(Days).map((day) => (
              <div key={day} className="space-x-2">
                <input
                  name="days"
                  type="checkbox"
                  id={`day-${day}`}
                  value={day}
                  checked={!!selectedDays[day]}
                  onChange={() => handleDayChange(day)}
                />
                <label
                  htmlFor={`day-${day}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {day}
                </label>
              </div>
            ))}
          </div>
          <div>
          <h1>Horários disponíveis</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 col-span-1">

            {Object.values(Hours).map((hour) => (
              <div key={hour} className="space-x-2">
                <input
                  name="hours"
                  type="checkbox"
                  id={`hour-${hour}`}
                  value={hour}
                  checked={!!selectedHours[hour]}
                  onChange={() => handleHourChange(hour)}
                />
                <label
                  htmlFor={`hour-${hour}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {hour}
                </label>
              </div>
            ))}
          </div>
          </div>
        </div>
        <Button type="submit">Salvar alterações</Button>
      </form>
      <Toaster />
    </div>
  );
}
