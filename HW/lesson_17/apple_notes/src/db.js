import Dexie from 'dexie'

const db = new Dexie('NotesDB')
db.version(1).stores({
    notes: '++id, title , text, date',
})

export default db
