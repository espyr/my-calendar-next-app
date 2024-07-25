import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';
import { TodoCardType, ComponentType } from '@/components/types';

// Initialize the database connection
const dbPath = path.resolve(process.cwd(), 'calendar.db');
const db = new sqlite3.Database(dbPath);

// Handler for GET requests
export async function GET(req: NextRequest) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM todos', (err, todos: TodoCardType[]) => {
      if (err) {
        console.error('Failed to fetch todos:', err);
        resolve(NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 }));
      } else {
        const todoIds = todos.map(todo => todo.id);
        db.all('SELECT * FROM components WHERE todo_id IN (' + todoIds.join(',') + ')', (err, components: ComponentType[]) => {
          if (err) {
            console.error('Failed to fetch components:', err);
            resolve(NextResponse.json({ error: 'Failed to fetch components' }, { status: 500 }));
          } else {
            const todosWithComponents = todos.map(todo => {
              return {
                ...todo,
                components: components.filter(component => component.todo_id === todo.id)
              };
            });
            resolve(NextResponse.json(todosWithComponents, { status: 200 }));
          }
        });
      }
    });
  });
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, components } = body;

  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO todos (title) VALUES (?)');
    stmt.run(title, function (err: any) {
      if (err) {
        console.error('Failed to create todo:', err);
        resolve(NextResponse.json({ error: 'Failed to create todo' }, { status: 500 }));
      } else {
        const todoId = this.lastID;
        const componentStmt = db.prepare('INSERT INTO components (todo_id, description, completed) VALUES (?, ?, ?)');
        components.forEach((component: ComponentType) => {
          componentStmt.run(todoId, component.description, component.completed);
        });
        componentStmt.finalize();
        resolve(NextResponse.json({ message: 'Todo created', id: todoId }, { status: 201 }));
      }
    });
  });
}

// Handler for PUT requests
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, title, components } = body;

  return new Promise((resolve, reject) => {
    const stmt = db.prepare('UPDATE todos SET title = ? WHERE id = ?');
    stmt.run(title, id, (err: any) => {
      if (err) {
        console.error('Failed to update todo:', err);
        resolve(NextResponse.json({ error: 'Failed to update todo' }, { status: 500 }));
      } else {
        const deleteStmt = db.prepare('DELETE FROM components WHERE todo_id = ?');
        deleteStmt.run(id, (err: any) => {
          if (err) {
            console.error('Failed to delete components:', err);
            resolve(NextResponse.json({ error: 'Failed to delete components' }, { status: 500 }));
          } else {
            const componentStmt = db.prepare('INSERT INTO components (todo_id, description, completed) VALUES (?, ?, ?)');
            components.forEach((component: ComponentType) => {
              componentStmt.run(id, component.description, component.completed);
            });
            componentStmt.finalize();
            resolve(NextResponse.json({ message: 'Todo updated' }, { status: 200 }));
          }
        });
      }
    });
  });
}

// Handler for DELETE requests
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  return new Promise((resolve, reject) => {
    const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
    stmt.run(id, (err: any) => {
      if (err) {
        console.error('Failed to delete todo:', err);
        resolve(NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 }));
      } else {
        const deleteComponentsStmt = db.prepare('DELETE FROM components WHERE todo_id = ?');
        deleteComponentsStmt.run(id, (err: any) => {
          if (err) {
            console.error('Failed to delete components:', err);
            resolve(NextResponse.json({ error: 'Failed to delete components' }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ message: 'Todo and components deleted' }, { status: 200 }));
          }
        });
      }
    });
  });
}
