const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes_api.js').module

yargs.version('1.0.0')

yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            alias: 't',
            describe: 'Title of the note',
            demandOption: true,
            type: 'string',
        },
        body: {
            alias: 'b',
            describe: 'Body of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)
    },
})

yargs.command({
    command: 'list',
    describe: 'List all notes or by the title given',
    builder: {
        sort: {
            alias: 's',
            describe: 'Sort notes by title',
            demandOption: false,
            type: 'boolean',
            default: false,
        },
        title: {
            alias: 't',
            describe: 'Enter the title of note you want',
            demandOption: false,
            type: 'string',
            default: '',
        },
    },
    handler: (argv) => {
        const data = notes.loadNotes()
        if (argv.sort) {
            data.sort((a, b) => {
                let at = a.title.toUpperCase()
                let bt = b.title.toUpperCase()
                return at < bt ? -1 : at > bt ? 1 : 0
            })
        }
        if (argv.title.length === 0) {
            for (const d of data) {
                console.log(
                    chalk.bold(`Title: ${d.title} \n`) +
                        `Body: ${d.body} \n----------------\n`
                )
            }
        } else {
            const d = data.find((d) => d.title === argv.title)
            if (d)
                console.log(
                    chalk.bold(`Title: ${d.title} \n`) +
                        `Body: ${d.body} \n----------------\n`
                )
            else console.log(chalk.bold.red('No note found'))
        }
    },
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            alias: 't',
            describe: 'Title of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => {
        notes.removeNote(argv.title)
    },
})

yargs.parse()
