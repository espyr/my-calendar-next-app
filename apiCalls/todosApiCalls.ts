import { Todo } from "@/components/types";

export const getTodos = async () => {
  const response = await fetch('/api/todos');
  const data = await response.json();
  return data;
}

export const addTodo = async (todo: Todo) => {
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

export const updateTodo = async (todo: Todo) => {
  try {
    const response = await fetch(`/api/todos/${todo.id}`, {
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

export const deleteTodo = async (todoId: string) => {
  try {
    const response = await fetch(`/api/todos/${todoId}`, {
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
