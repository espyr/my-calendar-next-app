import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';
import { Todo } from '@/components/types';

// Initialize the database connection
const dbPath = path.resolve(process.cwd(), 'calendar.db');
const db = new sqlite3.Database(dbPath);

// Handler for GET requests
export async function GET(req: NextRequest) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM todos', (err, rows: Todo[]) => {
            if (err) {
                console.error('Failed to fetch todos:', err);
                resolve(NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 }));
            } else {
                resolve(NextResponse.json(rows, { status: 200 }));
            }
        });
    });
}

// Handler for POST requests
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { description, completed} = body;

    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO todos (description, completes) VALUES (?, ?)');
        stmt.run(description, completed, (err: any) => {
            if (err) {
                console.error('Failed to create todo:', err);
                resolve(NextResponse.json({ error: 'Failed to create todo' }, { status: 500 }));
            } else {
                resolve(NextResponse.json({ message: 'Todo created' }, { status: 201 }));
            }
        });
    });
}

// Handler for PUT requests
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { id, description, completed } = body;

    return new Promise((resolve, reject) => {
        const stmt = db.prepare('UPDATE todos SET description = ?, completed = ? WHERE id = ?');
        stmt.run(description, completed, id, (err: any) => {
            if (err) {
                console.error('Failed to update todo:', err);
                resolve(NextResponse.json({ error: 'Failed to update todo' }, { status: 500 }));
            } else {
                resolve(NextResponse.json({ message: 'Todo updated' }, { status: 200 }));
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
                resolve(NextResponse.json({ message: 'Todo deleted' }, { status: 200 }));
            }
        });
    });
}
