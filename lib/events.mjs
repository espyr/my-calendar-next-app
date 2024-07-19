import sql from 'sqlite3';
const db = sql('calendar.db');

export async function getEvents () {
return await db.prepare('SELECT * FROM  events').run()
}