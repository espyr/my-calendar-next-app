import React, { useState, ChangeEvent } from "react";
import {v4 as uuidv4} from 'uuid';
import { CalendarEvent } from "./types";

type AddEventProps = {
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  onClose: () => void;
  mode: "add" | "edit";
  data: CalendarEvent | string;
};

const AddEvent: React.FC<AddEventProps> = (props) => {
  const initialEventState: CalendarEvent =
    props.mode === "edit" && typeof props.data !== "string"
      ? props.data
      : {
          id:uuidv4(),
          type: "startPer",
          description: "",
          date: typeof props.data === "string" ? props.data : "",
          time: "",
        };
  const [event, setEvent] = useState<CalendarEvent>(initialEventState);
  const handleDelete = () => {
    props.mode === "edit" &&
      typeof props.data !== "string" &&
      props.setEvents((prevState) =>
        prevState.filter((prEvent) => prEvent.id !== event.id)
      );
    props.onClose();
  };
  const handleSubmit = () => {
    if (props.mode === "add") {
      props.setEvents((prevEvents) => [...prevEvents, event]);
    } else {
      props.setEvents((prevEvents) =>
        prevEvents.map((prevEvent) =>
          prevEvent.id === event.id ? event : prevEvent
        )
      );
    }
    props.onClose();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    attribute: string
  ) => {
    setEvent({ ...event, [attribute]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4 text-center border-none">
      <h2 className="text-2xl ">{`${
        props.mode === "edit" ? "Edit" : "Add"
      } Event`}</h2>
      <form
        id="eventForm"
        className="flex gap-5 flex-col border-none focus:border-none"
      >
        <input
          id="eventTitleInput"
          className="h-10 p-2 outline-none"
          placeholder="Description"
          value={event.description}
          onChange={(e) => handleChange(e, "description")}
        />
        <div className="flex gap-3 text-center items-center">
          <label htmlFor="event" className="flex text-center">
            Choose event:
          </label>
          <select
            id="event"
            className="h-10 p-2"
            value={event.type}
            name="event"
            style={{ padding: "5px", outline: "none" }}
            onChange={(e) => handleChange(e, "type")}
          >
            <option value="startPer">Period Start</option>
            <option value="endPer">Period End</option>
            <option value="incident">Incident</option>
            <option value="medicalAppointment">Medical Appointment</option>
            <option value="event">Event</option>
            <option value="gym">Gym</option>
            <option value="drink">Drink</option>
            <option value="coffee">Coffee</option>
            <option value="work">Work</option>
            <option value="coding">Coding</option>
          </select>
          <input
            className="h-10 p-2  outline-none"
            type="time"
            id="time"
            value={event.time}
            name="time"
            onChange={(e) => handleChange(e, "time")}
          />
        </div>
      </form>
      <div className="flex justify-between px-8 pt-5">
        <button
          className="bg-red p-3 rounded-md text-white text-lg"
          onClick={props.onClose}
        >
          Cancel
        </button>
        {props.mode === 'edit' && <button
          className="bg-fuchsia-700 p-3 rounded-md text-white text-lg"
          onClick={handleDelete}
          id="deleteButton"
        >
          Delete
        </button>}
        <button
          className="bg-green p-3 rounded-md text-white text-lg"
          onClick={handleSubmit}
          id="saveButton"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
