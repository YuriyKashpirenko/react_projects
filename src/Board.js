import React, {Component} from 'react'
import Note from './Note'
import FaPlus from 'react-icons/lib/fa/plus'
//export Fa500px from './500px'

class Board extends Component {
  //constructor
  constructor(props){
    super(props)
    this.state = {
      //array of notes
      notes: [
        {
          id: this.nextId(),
          note: ""
        }
        // {
        //   id: 0,
        //   note: "Call Yuriy"
        // },
        // {
        //   id: 1,
        //   note: "Email Daniel"
        // },
        // {
        //   id: 2,
        //   note: "Order printer ink"
        // }
      ]
    }
    this.add = this.add.bind(this)
    this.eachNote = this.eachNote.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
    this.nextId = this.nextId.bind(this)
  }

  //get info from API with 'Fetch'
  componentWillMount(){
    var self = this
    if(this.props.count){
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
        .then(response => response.json())
        .then(json => json[0]
                        .split('. ')
                        .forEach(sentence => self.add(sentence.substring(0, 25)))
             )
    }
  }

  //add note
  add(text){
    console.log('add note')
    this.setState(prevState => ({
      notes: [
        ...prevState.notes, {
          id: this.nextId(),
          note: text
        }
      ]
    }))
  }

  //create id for a note in add(text) method
  nextId(){
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  //update text in the note
  update(newText, i){
    console.log('updating item at index', i, newText)
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== i) ? note : {...note, note: newText}
      )
    }))
  }

  //remove note
  remove(id){
    console.log('removing item at ', id)
    this.setState(prevState => ({
      notes:prevState.notes.filter(note => note.id !== id)
    }))
  }

  //display notes
  eachNote(note, i){
    return(
      //keep track which note was updated and/or deleted and to avoid an issue with unique keys
      <Note key = {note.id}
            index = {note.id}
            onChange = {this.update}
            onRemove = {this.remove}>
            {note.note}
      </Note>
    )
  }

  //render Board
  render(){
    return(
      <div className = "board">
        {this.state.notes.map(this.eachNote)}
        <button onClick = {this.add.bind(null, "New Note")}
        id = "add">
          <FaPlus />
        </button>
      </div>
    )
  }
}

export default Board
