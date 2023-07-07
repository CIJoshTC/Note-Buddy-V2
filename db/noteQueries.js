const util = require('util')
const fs = require('fs')

const asyncReadFile = util.promisify(fs.readFile)
const asyncWriteFile = util.promisify(fs.writeFile)

class NoteQueries {
    read() {
        return asyncReadFile('db/db.json', 'utf8')
    }

    write(note) {
        return asyncWriteFile('db/db.json', JSON.stringify(note))
    }

    retrieveNotes() {
        return this.read().then((notes) => {
            let processedNotes
            try {
                processedNotes = [...JSON.parse(notes)]
            } catch (err) {
                processedNotes = []
            }
            return processedNotes
        })
    }

    deleteNote(id) {
        return this.retrieveNotes()
            .then((notes) => {
                return notes.filter(((item) => item.id !== id))
            })
            .then((newNotesDb) => {
                this.write(newNotesDb)
            })
    }
}

module.exports = new NoteQueries()