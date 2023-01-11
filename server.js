import express from 'express'
import * as database from './mysqlDatabase.js'
const app = express()

// app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// const notes = []
app.get('/', async (req, res) => {
    const notes = await database.getNotes()
    res.render('index.ejs', {myNotes: notes})
})

//get note by index
app.get('/:id', async (req, res) => {
    const id = req.params.id
    const notes = await database.getNotes()
    const note = notes.find(note => note.id == id)
    res.render('note.ejs', {note})  
})

app.post('/createNote', async (req, res) => {
    const {title, contents} = req.body

    await database.addNote(title, contents)

    res.redirect('/')   
})

//delete note
app.post('/deleteNote', async (req, res) => {
    const {id} = req.body

    await database.deleteNote(id)

    res.redirect('/')
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//write error handler express 5
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

