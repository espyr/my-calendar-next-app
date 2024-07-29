"use client";

import { getTodos, updateCard, updateComponentStatus } from "@/apiCalls/todosApiCalls";
import { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Modal from "react-modal";
import AddTodoCard from "./AddTodoCard";
import { DndContext } from "./DndContext ";
import TodoCard from "./TodoCard";
import { DragEndType, TodoCardType } from "./types";
import Image from "next/image";
import checked from "../public/checked.png";
import unchecked from "../public/unchecked.png";

const TodosDnd = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toRefetch, setToRefetch] = useState<boolean>(false);
  const [data, setData] = useState<TodoCardType[] | []>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<TodoCardType>();
  const handleCompletion = async (id: number, completed:boolean) => {
    await updateComponentStatus(id, completed);
    setToRefetch((prev) => !prev);

  };
  const onDragEnd = async (result: DragEndType) => {
    const { source, destination } = result;
    if (!destination) return;
    console.log(source, "result");

    let updatedData = [...data];
    const sourceIndex = updatedData.findIndex(
      (x) => x.id === +source.droppableId
    );
    console.log(updatedData, "updatedData");
    const destinationIndex = updatedData.findIndex(
      (x) => x.id === +destination.droppableId
    );

    // Check if indices are valid
    if (sourceIndex === -1 || destinationIndex === -1) {
      console.error("Invalid source or destination index");
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const [movedItem] = updatedData[sourceIndex].components.splice(
        source.index,
        1
      );
      updatedData[destinationIndex].components.splice(
        destination.index,
        0,
        movedItem
      );
    } else {
      const [movedItem] = updatedData[sourceIndex].components.splice(
        source.index,
        1
      );
      updatedData[destinationIndex].components.splice(
        destination.index,
        0,
        movedItem
      );
    }

    try {
      const response1 = await updateCard(updatedData[sourceIndex]);
      const response2 = await updateCard(updatedData[destinationIndex]);

      if (!response1.ok && !response2.ok) {
        console.error("Error updating components order:", response1.statusText);
      } else {
        setToRefetch((prev) => !prev);
      }
    } catch (error) {
      console.error("Error updating components order:", error);
    }
  };
  useEffect(() => {
    const fetchTodos = async () => {
      const myTodos = await getTodos();
      setData(myTodos);
    };
    fetchTodos();
  }, [toRefetch]);
  return (
    <>
      <div className="flex items-center justify-end mr-8">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-fuchsia-400 p-3 rounded-md text-white text-lg my-14"
        >
          + Add New Card
        </button>
      </div>
      <DndContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 justify-center my-20 mx-4 flex-col lg:flex-row">
          {data.map((val, index) => {
            return (
              <Droppable key={index} droppableId={val.id.toString()}>
                {(provided) => (
                  <TodoCard
                    setIsEditModalOpen={setIsEditModalOpen}
                    setSelectedCard={setSelectedCard}
                    item={val}
                    provided={provided}
                  >
                    <div>
                      {val.components?.map((component, index) => (
                        <Draggable
                          key={component.id}
                          draggableId={component.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className={`flex justify-between items-center ${
                                component.completed ? "line-through" : ""
                              } bg-light-beige text-black mx-1 px-4 py-3 my-3`}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              {component.description}
                              {component.completed ? (
                                <Image src={checked} className="w-4 h-4" alt="" onClick={()=>handleCompletion(component.id, false)} />
                              ) : (
                                <Image src={unchecked} className="w-5 h-5" alt="" onClick={()=>handleCompletion(component.id, true)}/>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </TodoCard>
                )}
              </Droppable>
            );
          })}
        </div>
        {isEditModalOpen && (
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            className="relative bg-gradient-to-r from-purple-300 via-pink-300 to-red-200  w-11/12 max-w-lg p-8 rounded-lg shadow-2xl outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 border-0 flex items-center justify-center"
          >
            <AddTodoCard
              setToRefetch={setToRefetch}
              data={selectedCard as TodoCardType}
              mode="edit"
              onClose={() => setIsEditModalOpen(false)}
            />
          </Modal>
        )}
        {isAddModalOpen && (
          <Modal
            isOpen={isAddModalOpen}
            onRequestClose={() => setIsAddModalOpen(false)}
            className="relative bg-gradient-to-r from-purple-300 via-pink-300 to-red-200  w-11/12 max-w-lg p-8 rounded-lg shadow-2xl outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 border-0 flex items-center justify-center"
          >
            <AddTodoCard
              setToRefetch={setToRefetch}
              data={{
                id: Math.random(),
                title: "",
                components: [],
              }}
              mode="add"
              onClose={() => setIsAddModalOpen(false)}
            />
          </Modal>
        )}
      </DndContext>
    </>
  );
};

export default TodosDnd;
