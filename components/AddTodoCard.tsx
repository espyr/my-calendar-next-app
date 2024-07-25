import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { TodoCardType } from "./types";
import { addNewCard, deleteCard, updateCard } from "@/apiCalls/todosApiCalls";

type AddTodoCardProps = {
  onClose: () => void;
  mode: "add" | "edit";
  data: TodoCardType;
  setToRefetch: Dispatch<SetStateAction<boolean>>;
};

const AddTodoCard: React.FC<AddTodoCardProps> = (props) => {
  const [newCard, setNewCard] = useState<TodoCardType>(props.data);

  const handleSubmit = async () => {
    if (props.mode === "add") {
      await addNewCard(newCard);
    } else {
      await updateCard(newCard);
    }
    props.setToRefetch((prVal) => !prVal);

    props.onClose();
  };
  const handleDelete = async () => {
    console.log(props.data.id, "props.data.id");
    await deleteCard(props.data.id);
    props.setToRefetch((prVal) => !prVal);
    props.onClose();
  };
  const handleComponentChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    attribute: string
  ) => {
    const updatedComponents = newCard.components.map((component, i) =>
      i === index ? { ...component, [attribute]: e.target.value } : component
    );
    setNewCard({ ...newCard, components: updatedComponents });
  };

  const addComponent = () => {
    setNewCard({
      ...newCard,
      components: [
        ...newCard.components,
        {
          id: Math.random(),
          description: "",
          completed: false,
          todo_id: props.data.id,
        },
      ],
    });
  };

  const removeComponent = (index: number) => {
    const updatedComponents = newCard.components.filter((_, i) => i !== index);
    setNewCard({ ...newCard, components: updatedComponents });
  };

  return (
    <div className="flex flex-col gap-4 text-center text-black border-none">
      <h2 className="text-3xl font-extrabold mb-4 text-center text-white">
        {props.mode === "edit" ? "Edit" : "Add"} Todo Card
      </h2>
      <form className="flex gap-5 flex-col border-none focus:border-none">
        <input
          className="h-10 p-2 outline-none"
          placeholder="Card Title"
          value={newCard.title || ""}
          onChange={(e) =>
            setNewCard((prVal) => ({ ...prVal, title: e.target.value }))
          }
        />
        {newCard.components.map((component, index) => (
          <div key={component.id} className="flex gap-2 items-center">
            <input
              className="h-10 p-2 outline-none flex-grow"
              placeholder="Task Description"
              value={component.description}
              onChange={(e) => handleComponentChange(e, index, "description")}
            />
            <button
              type="button"
              className="bg-red-500 p-2 rounded-md text-black"
              onClick={() => removeComponent(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 p-2 rounded-md text-black"
          onClick={addComponent}
        >
          + Add Task
        </button>
      </form>
      <div className="flex justify-between px-8 pt-5">
        <button
          className="bg-rose p-3 rounded-md text-white text-lg"
          onClick={props.onClose}
        >
          Cancel
        </button>
        {props.mode === "edit" && (
          <button
            className="bg-fuchsia-400 p-3 rounded-md text-white text-lg"
            onClick={handleDelete}
            id="deleteButton"
          >
            Delete
          </button>
        )}
        <button
          className="bg-emerald-400 p-3 rounded-md text-white text-lg"
          onClick={handleSubmit}
          id="saveButton"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddTodoCard;
