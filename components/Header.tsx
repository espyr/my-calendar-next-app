'use client'
import { useEffect } from 'react';
import { NextButton } from '../public/NextButton'
import { PrevButton } from "../public/PrevButton";
type HeaderProps = {
  currentDate:string;
  setMonthStep: React.Dispatch<React.SetStateAction<number>>;
}
const Header: React.FC<HeaderProps>  = ({currentDate, setMonthStep}) => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  useEffect (()=>{

    console.log(currentDate,'currentDate')
  })
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
        <div className='flex gap:4 text-center justify-center py-24'>
          <PrevButton
            onClick={() => {
              setMonthStep((prevState) => prevState - 1);
            }}
          />
          <div className='text-5xl px-7 font-bold text-light-brown stroke-amber-900 stroke-2 '>{currentDate}</div>
          <NextButton
            onClick={() => setMonthStep((prevState) => prevState + 1)}
          />
        </div>
      <div className="grid grid-cols-7 gap-1 laptop:mx-24 desktop:mx-10 text-center font-medium text-3xl text-rose">
      {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
    </div>
  );
};
export default Header;
