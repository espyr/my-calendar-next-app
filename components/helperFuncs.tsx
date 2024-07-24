import perEnd from "../public/perEnd.png";
import perSt from "../public/perSt.png";
import medical from "../public/medical.png";
import gym from "../public/gym.png";
import coding from "../public/coding.png";
import work from "../public/work.png";
import coffee from "../public/coffee.png";
import drink from "../public/drink.png";
import incident from "../public/incident.png";
import eventIcon from "../public/event.png";
import { CalendarEvent } from "./types";
import Image from "next/image";
import calendar from "../public/calendar.png";
import period from "../public/period.png";
import todo from "../public/todo.png";
import statistics from "../public/statistics.png";

export const getLogo = (title: string) => {
  switch (title) {
    case "period":
      return <Image alt="" className="w-64 h-10" src={period}/>

    case "calendar":
      return <Image alt="" className="w-64 h-10" src={calendar}/>
    case "todo":
      return <Image alt="" className="w-64 h-10" src={todo}/>
    case "statistics":
      return <Image alt="" className="w-64 h-10" src={statistics}/>
  }
};
export const getIcon = (event: CalendarEvent) => {
  console.log(event, "event");
  switch (event.type) {
    case "startPer":
      return (
        <button className="w-full bg-red bg-opacity-50 flex gap-2">
          <Image alt="" className="w-5 h-5" src={perSt}/> 
          {event?.time}
          {"  "}
          {event?.description}
        </button>
      );
    case "endPer":
      return (
        <button className="w-full bg-red bg-opacity-50 flex gap-2">
          <Image alt="" className="w-5 h-5" src={perEnd}/> 
          {event?.time}
          {"  "}
          {event?.description}
        </button>
      );
    case "incident":
      return (
        <button className="w-full bg-yellow bg-opacity-50 flex gap-2">
          <Image alt="" className="w-5 h-5" src={incident}/> 
          {event?.time}
          {"  "}
          {event?.description}
        </button>
      );
    case "event":
      return (
        <button className="w-full bg-ciel bg-opacity-50 flex gap-2">
          <Image alt="" className="w-5 h-5" src={eventIcon}/> 
          {event?.time}
          {"  "}
          {event?.description}
        </button>
      );
    case "medicalAppointment":
      return (
        <button className="w-full bg-violet-950 bg-opacity-50 flex gap-2">
          <Image alt="" className="w-5 h-5" src={medical}/> 
          {event?.time}
          {"  "}
          {event?.description}
        </button>
      );
    case "gym":
      return (
        <button className="w-full bg-light-purple bg-opacity-50 flex gap-2">
          <Image alt="" className="w-5 h-5" src={gym}/> 
          {event?.time}
          {"  "}
          {event?.description}
        </button>
      );
    case "drink":
      return (
        <button className="w-full bg-teal-500 bg-opacity-50 flex gap-2">
          <Image alt="" className="w-5 h-5" src={drink}/> 
          {event?.time}
          {"  "}
          {event?.description}
        </button>
      );
    case "coffee":
      return (
        <button className="w-full bg-orange bg-opacity-50 flex gap-2">
          <Image alt="" className="w-5 h-5" src={coffee}/> 
          {event?.time}
          {"  "}
          {event?.description}
        </button>
      );
    case "work":
      return (
        <button className="w-full bg-lime-300 bg-opacity-50 flex gap-2">
          <Image alt="" className="w-5 h-5" src={work}/> 
          {event?.time}
          {"  "}
          {event?.description}
        </button>
      );
    case "coding":
      return (
        <button className="w-full bg-light-brown bg-opacity-50 flex gap-2">
          <Image alt="" className="w-5 h-5" src={coding}/> 
          {event?.time}
          {"  "}
          {event?.description}
        </button>
      );
    default:
      return null;
  }
};
