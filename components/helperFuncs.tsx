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


export const getIcon = (event: CalendarEvent) => {
    console.log(event,'event')
    switch (event.type) {
      case "startPer":
        return (
          <button className="w-full bg-red bg-opacity-50 flex gap-2" >
        <Image alt='' className="w-5 h-5" src={perSt}></Image>{event?.time}{'  '}{event?.description}
      </button>
        );
      case "endPer":
        return (

          <button className="w-full bg-red bg-opacity-50 flex gap-2" >
        <Image alt='' className="w-5 h-5" src={perEnd}></Image>{event?.time}{'  '}{event?.description}
      </button>

        );
      case "incident":
        return <button className="w-full bg-yellow bg-opacity-50 flex gap-2" >
        <Image alt='' className="w-5 h-5" src={incident}></Image>{event?.time}{'  '}{event?.description}
      </button>
      case "event":
        return<button className="w-full bg-ciel bg-opacity-50 flex gap-2" >
        <Image alt='' className="w-5 h-5" src={eventIcon}></Image>{event?.time}{'  '}{event?.description}
      </button>
      case "medicalAppointment":
        return <button className="w-full bg-violet-950 bg-opacity-50 flex gap-2" >
        <Image alt='' className="w-5 h-5" src={medical}></Image>{event?.time}{'  '}{event?.description}
      </button> 
      case "gym":
        return <button className="w-full bg-light-purple bg-opacity-50 flex gap-2" >
        <Image alt='' className="w-5 h-5" src={gym}></Image>{event?.time}{'  '}{event?.description}
      </button>
      case "drink":
        return <button className="w-full bg-teal-500 bg-opacity-50 flex gap-2" >
        <Image alt='' className="w-5 h-5" src={drink}></Image>{event?.time}{'  '}{event?.description}
      </button>
      case "coffee":
        return <button className="w-full bg-orange bg-opacity-50 flex gap-2" >
        <Image alt='' className="w-5 h-5" src={coffee}></Image>{event?.time}{'  '}{event?.description}
      </button>
      case "work":
        return <button className="w-full bg-lime-300 bg-opacity-50 flex gap-2" >
        <Image alt='' className="w-5 h-5" src={work}></Image>{event?.time}{'  '}{event?.description}
      </button>
      case "coding":
        return <button className="w-full bg-light-brown bg-opacity-50 flex gap-2" >
        <Image alt='' className="w-5 h-5" src={coding}></Image>{event?.time}{'  '}{event?.description}
      </button>
      default:
        return null;
    }
  };