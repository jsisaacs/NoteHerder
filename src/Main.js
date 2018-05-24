import React from 'react'

import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

var Rebase = require('re-base');
var firebase = require('firebase');
var app = firebase.initializeApp({
  apiKey: "AIzaSyCaS4NBj9CAgHH_F1f--oHHCqoZJPl8TVY",
  authDomain: "noteherder-87094.firebaseapp.com",
  databaseURL: "https://noteherder-87094.firebaseio.com",
  projectId: "noteherder-87094",
  storageBucket: "",
  messagingSenderId: "1096092326000"
});
var base = Rebase.createClass(app.database());

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      currentNote: this.blankNote(),
      notes: [],
    }
  }

  // componentWillMount() {
  //   localStorage.getItem('notes') && this.setState({
  //     currentNote: JSON.parse(localStorage.getItem('currentNote')),
  //     notes: JSON.parse(localStorage.getItem('notes'))
  //   })

  // }

  // componentWillUpdate(nextProps, nextState) {
  //   localStorage.setItem('notes', JSON.stringify(nextState.notes))
  //   localStorage.setItem('currentNote', JSON.stringify(nextState.currentNote))
    
  // }

  componentDidMount() {
    base.syncState(`notes`, {
      context: this,
      state: 'notes',
      asArray: true
    });
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

    // localStorage.setItem(note.id, notes)
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
