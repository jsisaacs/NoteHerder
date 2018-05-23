import React from 'react'

import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      currentNote: this.blankNote(),
      notes: [],
    }
  }

  componentWillMount() {
    localStorage.getItem('notes') && this.setState({
      currentNote: JSON.parse(localStorage.getItem('currentNote')),
      notes: JSON.parse(localStorage.getItem('notes'))
    })
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('notes', JSON.stringify(nextState.notes))
    localStorage.setItem('currentNote', JSON.stringify(nextState.currentNote))
    
  }

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
    }
  }

  setCurrentNote = (note) => {
    this.setState({ currentNote: note })
  }

  resetCurrentNote = () => {
    this.setCurrentNote(this.blankNote())
  }

  saveNote = (note) => {
    const notes = [...this.state.notes]

    if (!note.id) {
      // new note
      note.id = Date.now()
      notes.push(note)
    } else {
      // existing note
      const i = notes.findIndex(currentNote => currentNote.id === note.id)
      notes[i] = note
    }

    this.setState({ notes })
    this.setCurrentNote(note)

    localStorage.setItem(note.id, notes)
  }

  deleteNote = (note) => {
    const notesCopy = this.state.notes.splice(0)
    var index = notesCopy.indexOf(note)
    if (index > -1) {
      notesCopy.splice(index, 1)
    }
    this.setState({notes: notesCopy})
  }

  render() {
    return (
      <div className="Main" style={style}>
        <Sidebar resetCurrentNote={this.resetCurrentNote} />
        <NoteList
          notes={this.state.notes}
          setCurrentNote={this.setCurrentNote}
        />
        <NoteForm
          currentNote={this.state.currentNote}
          saveNote={this.saveNote}
          deleteNote={this.deleteNote}
        />
      </div>
    )
  }
}

const style = {
  display: 'flex',
  height: '100vh',
  alignItems: 'stretch',
}

export default Main
