import Image from "next/image";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { DroppableProvided } from "react-beautiful-dnd";
import edit from "../public/edit.png";
import { TodoCardType } from "./types";
interface TodoCardProps {
  item: TodoCardType;
  provided?: DroppableProvided;
  children: React.ReactNode;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedCard: Dispatch<SetStateAction<TodoCardType | undefined>>;
}

const TodoCard: FunctionComponent<TodoCardProps> = (props) => {
  return (
    <div
      className=" bg-gradient-to-r from-purple-300 via-pink-300 to-red-200  w-11/12 max-w-lg p-8 rounded-lg shadow-2xl outline-none"
      {...props.provided?.droppableProps}
      ref={props.provided?.innerRef}
      
    >
      <h2 className="text-center font-playwrite font-extrabold text-2xl mb-6 text-black">
        {props.item.title}
      </h2>
      {props.children}
      <div className="flex w-full items-center justify-end px-2">
        <button
          className="bg-fuchsia-400 p-1 rounded-md mt-3 text-white text-lg"
          onClick={() => {
            props.setSelectedCard(props.item);
            props.setIsEditModalOpen(true);
          }}
        >
          <Image alt="edit" className="w-8 h-8" src={edit} />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
