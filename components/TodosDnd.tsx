"use client";

import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { DndContext } from "./DndContext ";
import TodoCard from "./TodoCard";
import { TodoCardType } from "./types";
import AddTodoCard from "./AddTodoCard";
import Modal from "react-modal";
import { getTodos } from "@/apiCalls/todosApiCalls";

const TodosDnd = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toRefetch, setToRefetch] = useState<boolean>(false);
  const [data, setData] = useState<TodoCardType[] | []>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<TodoCardType>();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId.split("droppable")[1]
      );
      const [item] = newData[oldDroppableIndex].components.splice(
        source.index,
        1
      );
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    } else {
      const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
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
              <Droppable key={index} droppableId={`droppable${index}`}>
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
                              className={`${
                                component.completed ? "line-through" : ""
                              } bg-light-beige text-black mx-1 px-4 py-3 my-3`}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              {component.description}
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
