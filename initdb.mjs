import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function setupDatabase() {
  const db = await open({
    filename: 'calendar.db',
    driver: sqlite3.Database
  });

  // Create table if it doesn't exist
  await db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      type TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT
    )
  `);
  console.log('Table created or already exists.');

  // Insert dummy data
  const dummyCalendarEvents = [
    { description: 'Coffee with Dimitra', type: 'coffee', date: '2024-7-18', time: '16:00' },
    { description: 'Coffee with Foteini', type: 'coffee', date: '2024-7-19', time: '18:00' },
    { description: 'Work', type: 'coding', date: '2024-7-19', time: '09:00' }
  ];

  const stmt = await db.prepare(`
    INSERT INTO events (description, type, date, time) VALUES (?, ?, ?, ?)
  `);

  try {
    for (const event of dummyCalendarEvents) {
      await stmt.run(event.description, event.type, event.date, event.time);
    }
    console.log('Dummy data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

setupDatabase().catch(console.error);
