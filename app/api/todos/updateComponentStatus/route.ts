import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'calendar.db');
const db = new sqlite3.Database(dbPath);

export async function PUT(req: NextRequest) {
  const { id, completed } = await req.json();

  return new Promise((resolve) => {
    const stmt = db.prepare('UPDATE components SET completed = ? WHERE id = ?');
    stmt.run(completed, id, (err:any) => {
      if (err) {
        console.error('Failed to update component:', err);
        return resolve(NextResponse.json({ error: 'Failed to update component' }, { status: 500 }));
      }

      resolve(NextResponse.json({ message: 'Component updated' }, { status: 200 }));
    });
  });
}
