import { FunctionComponent } from "react";
import { DroppableProvided } from "react-beautiful-dnd";

interface TodoCardProps {
  title: string;
  provided?: DroppableProvided;
  children: React.ReactNode;
}

const TodoCard: FunctionComponent<TodoCardProps> = (props) => {
  return (
    <div
      className=" bg-gradient-to-r from-purple-300 via-pink-300 to-red-200  w-11/12 max-w-lg p-8 rounded-lg shadow-2xl outline-none"
      {...props.provided?.droppableProps}
      ref={props.provided?.innerRef}
    >
      <h2 className="text-center font-playwrite font-extrabold text-2xl mb-6 text-black">
        {props.title}
      </h2>
      {props.children}
    </div>
  );
};

export default TodoCard;
