import { CalendarEvent } from "@/components/types";

export const getEvents = async ()=>{
  const response = await fetch('/api/events');
    const data = await response.json();
    return(data)
}
export const addEvent = async (event:CalendarEvent) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      if (response.ok) {
        const newEvent = await response.json();
        console.log('Event created:', newEvent);
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
};
export const updateEvent = async (event:CalendarEvent) => {
    const response = await fetch('/api/events', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    });

    if (!response.ok) {
        console.error('Failed to update event');
    } else {
        const result = await response.json();
        console.log('Event updated:', result);
    }
};
export const deleteEvent = async (eventId:string) => {
    const response = await fetch(`/api/events?id=${eventId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        console.error('Failed to delete event');
    } else {
        const result = await response.json();
        console.log('Event deleted:', result);
    }
};
