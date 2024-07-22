import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';
import { CalendarEvent } from '@/components/types';

// Initialize the database connection
const dbPath = path.resolve(process.cwd(), 'calendar.db');
const db = new sqlite3.Database(dbPath);

// Handler for GET requests
export async function GET(req: NextRequest) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM events', (err, rows: CalendarEvent[]) => {
            if (err) {
                console.error('Failed to fetch events:', err);
                resolve(NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 }));
            } else {
                resolve(NextResponse.json(rows, { status: 200 }));
            }
        });
    });
}

// Handler for POST requests
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { description, type, date, time } = body;

    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO events (description, type, date, time) VALUES (?, ?, ?, ?)');
        stmt.run(description, type, date, time, (err: any) => {
            if (err) {
                console.error('Failed to create event:', err);
                resolve(NextResponse.json({ error: 'Failed to create event' }, { status: 500 }));
            } else {
                resolve(NextResponse.json({ message: 'Event created' }, { status: 201 }));
            }
        });
    });
}

// Handler for PUT requests
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { id, description, type, date, time } = body;

    return new Promise((resolve, reject) => {
        const stmt = db.prepare('UPDATE events SET description = ?, type = ?, date = ?, time = ? WHERE id = ?');
        stmt.run(description, type, date, time, id, (err: any) => {
            if (err) {
                console.error('Failed to update event:', err);
                resolve(NextResponse.json({ error: 'Failed to update event' }, { status: 500 }));
            } else {
                resolve(NextResponse.json({ message: 'Event updated' }, { status: 200 }));
            }
        });
    });
}

// Handler for DELETE requests
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    return new Promise((resolve, reject) => {
        const stmt = db.prepare('DELETE FROM events WHERE id = ?');
        stmt.run(id, (err: any) => {
            if (err) {
                console.error('Failed to delete event:', err);
                resolve(NextResponse.json({ error: 'Failed to delete event' }, { status: 500 }));
            } else {
                resolve(NextResponse.json({ message: 'Event deleted' }, { status: 200 }));
            }
        });
    });
}
