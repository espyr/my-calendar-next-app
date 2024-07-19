import React from "react";
import styles from "./Day.module.css";
import { getIcon } from "./helperFuncs";
import plus from '../public/plus.png'
import { CalendarDay, CalendarEvent } from "./types";
import Image from "next/image";

type DayProps = {
  item: CalendarDay;
  setEventClicked: React.Dispatch<React.SetStateAction<CalendarEvent | undefined>>
  setIsEditModalOpen: (value: React.SetStateAction<boolean>) => void
};

const Day: React.FC<DayProps> = ({ item, setEventClicked,setIsEditModalOpen }) => {
  const { id, text, className, onClick, isToday, events } = item;

 return (
    <div 
      key={id}
      className={`${styles[className]} ${isToday && styles["today"]} flex gap-3` }
    >
      {className !== "paddingDay" && (
        <div className="text-left ">
          {text}
          {events && (
            <div>
              {events.map((event, index) => (
                <div key={index} onClick={()=>{setEventClicked(event); setIsEditModalOpen(true)}}>{getIcon(event)}</div>
              ))}{" "}
            </div>
          )}
        </div>
      )}
      {className !== "paddingDay" && <Image className="flex self-end tablet:mr-7 desktop:mr-4 laptop:mr-4 w-3" onClick={onClick} src={plus} alt="dfgdf"/>}
    </div>
  );
};

export default Day;
