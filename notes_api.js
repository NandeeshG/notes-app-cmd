const fs = require('fs')
const chalk = require('chalk')
const filename = 'notes.json'

function saveNotes(notes) {
    fs.writeFile(filename, JSON.stringify(notes), (err) => {
        if (err) console.log(chalk.red.italic(err))
    })
}

function addNote(title, body) {
    const notes = loadNotes()
    const dup = notes.find((n) => n.title === title)
    if (dup) {
        console.log(chalk.red.inverse('Title taken!'))
        return
    }
    notes.push({ title, body })
    saveNotes(notes)
    console.log(chalk.green.bold('Added new note!'))
}
function removeNote(title) {
    const notes = loadNotes()
    const notes_red = notes.filter((note) => note.title !== title)
    if (notes.length !== notes_red.length) {
        saveNotes(notes_red)
        console.log(chalk.green.bold('Removed the note!'))
    } else {
        console.log(chalk.red.inverse('No such note found!'))
    }
}
function loadNotes() {
    try {
        const data = fs.readFileSync(filename)
        return JSON.parse(data)
    } catch (e) {
        return []
    }
}

exports.module = {
    addNote,
    removeNote,
    loadNotes,
}
