"use client";
import React, { useEffect, useState } from "react";
import Day from "./Day";
import Header from "./Header";
import { months, weekdays } from "./staticData";
import Modal from "react-modal";
import { v4 as uuidv4 } from 'uuid';
import AppBar from "./AppBar";
import { CalendarDay, CalendarEvent } from "./types";
import AddEvent from "./AddEvent";
import { getEvents } from "@/apiCalls/eventsApiCalls";

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
  const fetchEventsAndUpdateCalendar = async () => {
    const calendarEvents= await getEvents()
    setEvents(calendarEvents);
    loadCalendar(calendarEvents);
  };
  useEffect(() => {
    fetchEventsAndUpdateCalendar()
  }, [monthStep]);

  useEffect(() => {
   
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const newMonth = currentMonth + monthStep;
      console.log(newMonth,'newMonth')
      const yearOffset = Math.floor(newMonth / 12);
      setShownMonth(newMonth % 12);
      setShownYear(currentYear + yearOffset);
  
    setCurrentDate(` ${months[shownMonth]} ${shownYear}`);
  }, [monthStep, shownMonth, shownYear, events, setMonthStep]);

  const loadCalendar = (data:CalendarEvent[])=>{
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
        events: data.filter((event:CalendarEvent) => event.date === date),
      };
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
    setDayClicked(date);
  };

  return (
    <div className="flex flex-col w-full ">
      <AppBar title={"calendar"} />

      <div className="flex justify-end self-end mr-5 mt-4">
        <p
          className="text-brown-peach w-52 self-end font-cursive text-center border-4
         border-coral outset-border p-2 bg-white font-bold text-lg mr-6"
        >
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
        {isAddModalOpen && dayClicked && (
          <Modal
            isOpen={isAddModalOpen}
            onRequestClose={() => setIsAddModalOpen(false)}
            className="relative bg-gradient-to-r from-purple-300 via-pink-300 to-red-200  w-11/12 max-w-lg p-8 rounded-lg shadow-2xl outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 border-0 flex items-center justify-center"
          >
            <AddEvent
              setEvents={setEvents}
              onClose={() => setIsAddModalOpen(false)}
              data={dayClicked}
              mode={"add"}
              refetchEvents={fetchEventsAndUpdateCalendar}

            />
          </Modal>
        )}
        {isEditModalOpen && eventClicked && (
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            className="bg-beige w-6/12 p-4 rounded-lg"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"

          >
            <AddEvent
              setEvents={setEvents}
              onClose={() => setIsEditModalOpen(false)}
              data={eventClicked}
              mode={"edit"}
              refetchEvents={fetchEventsAndUpdateCalendar}

            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Calendar;
