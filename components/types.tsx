export type CalendarEvent = {
  id: string;
  type: string;
  description?: string;
  date: string | null;
  time?: string;
};
export type CalendarDay = {
  id: string;
  isToday: boolean;
  className: string;
  onClick: () => false | void;
  text: number;
  events: CalendarEvent[];
};
export type ComponentType = {
  id: number;
  todo_id: number;
  description: string;
  completed: boolean;
};

export type TodoCardType = {
  id: number;
  title: string;
  components: ComponentType[];
};

export type TodoCTodoCardsTypeards = TodoCardType[];
