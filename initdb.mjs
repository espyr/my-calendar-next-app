import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function setupDatabase() {
  // Open the SQLite database
  const db = await open({
    filename: 'calendar.db',
    driver: sqlite3.Database
  });

  try {
    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        type TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS components (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo_id INTEGER,
        description TEXT,
        completed BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (todo_id) REFERENCES todos(id)
      )
    `);

    console.log('Tables created or already exist.');

    // Insert dummy data for events
    const dummyCalendarEvents = [
      { description: 'Coffee with Dimitra', type: 'coffee', date: '2024-7-18', time: '16:00' },
      { description: 'Coffee with Foteini', type: 'coffee', date: '2024-7-19', time: '18:00' },
      { description: 'Work', type: 'coding', date: '2024-7-19', time: '09:00' }
    ];

    const eventStmt = await db.prepare(`
      INSERT INTO events (description, type, date, time) VALUES (?, ?, ?, ?)
    `);

    for (const event of dummyCalendarEvents) {
      await eventStmt.run(event.description, event.type, event.date, event.time);
    }

    await eventStmt.finalize();

    // Insert dummy data for todos and components
    const dummyTodos = [
      {
        title: "Component Librarys",
        components: [
          {
            description: "material ui",
            completed: false,
          },
        ],
      },
      {
        title: "Javascript Librarys",
        components: [
          {
            description: "react",
            completed: false,
          },
        ],
      }
    ];

    const todoStmt = await db.prepare(`
      INSERT INTO todos (title) VALUES (?)
    `);

    const componentStmt = await db.prepare(`
      INSERT INTO components (todo_id, description, completed) VALUES (?, ?, ?)
    `);

    for (const todo of dummyTodos) {
      const result = await todoStmt.run(todo.title);
      const todoId = result.lastID;

      for (const component of todo.components) {
        await componentStmt.run(todoId, component.description, component.completed);
      }
    }

    await todoStmt.finalize();
    await componentStmt.finalize();

    console.log('Dummy data inserted successfully.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the database connection
    await db.close();
  }
}

setupDatabase().catch(console.error);
