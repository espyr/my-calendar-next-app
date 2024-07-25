"use client";
import React, { useEffect, useState } from "react";
import { TodoCardType } from "@/components/types";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "@/apiCalls/todosApiCalls";

const MyTodos: React.FC = () => {
  const [todos, setTodos] = useState<TodoCardType[]>([]);
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");

  const fetchTodos = async () => {
    const myTodos = await getTodos();
    console.log(myTodos, "fjefjkdsjf");
    setTodos(myTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const newTodo = await addTodo({
      description: newTodoDescription,
      completed: false,
    });
    // setTodos([...todos, newTodo]);
    setNewTodoDescription("");
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    const updatedTodo = await updateTodo({
      id,
      completed: !completed,
      description: "",
    });
    // setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !completed } : todo)));
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id.toString());
    // setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="flex flex-col text-black w-full justify-center align-middle items-center">
      {/* <div className="text-3xl pt-6 font-bold text-light-brown stroke-amber-900 stroke-2 ">
        THINGS TO DO
      </div>
      <label htmlFor="todo">Add a new todo</label>
      <input
        id="todo"
        type="text"
        value={newTodoDescription}
        onChange={(e) => setNewTodoDescription(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul className="">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              onClick={() => handleToggleTodo(todo.id!, todo.completed)}
            >
              {todo.description}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id!)}>Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default MyTodos;
