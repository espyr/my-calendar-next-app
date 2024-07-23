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
export type Todo = {
  id?: string;
  description?: string;
  completed: boolean;
};

export type TodoCardType= {
  id: number;
  title: string;
  components: {
    id: number;
    description: string;
    completed: boolean;
  }[];
  
}

export type TodoCTodoCardsTypeards= TodoCardType[]
  
