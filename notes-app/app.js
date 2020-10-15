const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

//Customize yargs versions
yargs.version('1.1.0')

//add, remove, read, list

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'The main content of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
       notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe: 'reading a note',
    builder: {
        title: {
            describe: 'Note Title to be read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'listing all notes',
    handler(){
       notes.listNotes()
    }
})

yargs.parse()