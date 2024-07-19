"use client";
import React, { useEffect, useState } from "react";
import Day from "./Day";
import Header from "./Header";
import { months, weekdays } from "./staticData";

import {v4 as uuidv4} from 'uuid';
import AppBar from "./AppBar";
import { CalendarDay, CalendarEvent } from "./types";

const Calendar: React.FC = () => {
  const [monthStep, setMonthStep] = useState<number>(0);
  const [dayClicked, setDayClicked] = useState<string>();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [eventClicked, setEventClicked] = useState<CalendarEvent>();
  const [shownMonth, setShownMonth] = useState<number>(new Date().getMonth());
  const [shownYear, setShownYear] = useState<number>(new Date().getFullYear());
  const newDay = new Date();
  const today = `${newDay.getDate()} ${
    months[newDay.getMonth()]
  } ${newDay.getFullYear()}`;
  const [currentDate, setCurrentDate] = useState<string>("");
  const [calendarContent, setCalendarContent] = useState<CalendarDay[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetch('/api/events')
        .then(response => response.json())
        .then(data => setEvents(data));
}, []);
  useEffect(() => {

    if (monthStep !== 0) {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const newMonth = currentMonth + monthStep;
      const yearOffset = Math.floor(newMonth / 12);
      setShownMonth(newMonth % 12);
      setShownYear(currentYear + yearOffset);
    }
    setCurrentDate(` ${months[shownMonth]} ${shownYear}`);
    loadCalendar();
  }, [monthStep, shownMonth, shownYear, events]);

  const loadCalendar = () => {
    setCalendarContent([]);
    const daysInMonth = new Date(shownYear, shownMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(
      shownYear,
      shownMonth,
      1
    ).toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const paddingDays = weekdays.indexOf(firstDayOfMonth.split(", ")[0]);
    const calendarDays = [];
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const date = `${shownYear}-${shownMonth + 1}-${i - paddingDays}`;
      const daySquare = {
        id: uuidv4(),
        isToday: isToday(date),
        className: i <= paddingDays ? "paddingDay" : "day",
        onClick: () => i > paddingDays && openModal(date),
        text: i - paddingDays,
        events: events.filter((event) => event.date === date),
      };
console.log(date)
      calendarDays.push(daySquare);
    }
    setCalendarContent(calendarDays);
  };

  const isToday = (date: string) => {
    const date1 = new Date(date);
    const date2 = new Date(today);
    return date2.toDateString() === date1.toDateString();
  };

  const openModal = (date: string) => {
    setIsAddModalOpen(true);
    console.log(date);
    setDayClicked(date);
  };

  return (
    <div className="flex flex-col w-full ">
      <AppBar title={"My Calendar"} />

      <div className="flex justify-end self-end mr-5 mt-4">
        <p
          className=" text-brown-peach  w-52 self-end font-cursive	text-center border-4
         border-coral outset-border p-2 bg-white font-bold text-lg mr-6"
        >
          {" "}
          {today}
        </p>
      </div>
      <div>
        <Header currentDate={currentDate} setMonthStep={setMonthStep} />
        {calendarContent && (
          <div className="grid grid-cols-7 gap-1 laptop:mx-2 tablet:mx-2 desktop:mx-10 pb-3">
            {calendarContent.map((item: CalendarDay) => (
              <Day
                key={item.id}
                item={item}
                setEventClicked={setEventClicked}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            ))}
          </div>
        )}
        {/* {isAddModalOpen && dayClicked && (
          <Modal onHideModal={() => setIsAddModalOpen(false)}>
            <AddEvent
              setEvents={setEvents}
              onClose={() => setIsAddModalOpen(false)}
              data={dayClicked}
              mode={"add"}
            />
          </Modal>
        )}
        {isEditModalOpen && eventClicked && (
          <Modal onHideModal={() => setIsAddModalOpen(false)}>
            <AddEvent
              setEvents={setEvents}
              onClose={() => setIsEditModalOpen(false)}
              data={eventClicked}
              mode={"edit"}
            />
          </Modal>
        )} */}
      </div>

    </div>
  );
};

export default Calendar;
