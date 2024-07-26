// apiCalls/todosApiCalls.js
import { TodoCardType } from "@/components/types";

export const getTodos = async () => {
  const response = await fetch('/api/todos');
  const data = await response.json();
  return data;
}

export const addNewCard = async (todo: TodoCardType) => {
  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (response.ok) {
      const newTodo = await response.json();
      return newTodo;
    } else {
      console.error('Failed to create todo');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateCard = async (todo: TodoCardType) => {
  try {
    const response = await fetch(`/api/todos?id=${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error('Failed to update todo');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteCard = async (todoId: number) => {
  try {
    const response = await fetch(`/api/todos?id=${todoId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error('Failed to delete todo');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// New function to update the order of components
export const updateComponentsOrder = async (todos: TodoCardType[]) => {
  try {
    const response = await fetch('/api/todos/updateComponentsOrder', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todos),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error('Failed to update components order');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
