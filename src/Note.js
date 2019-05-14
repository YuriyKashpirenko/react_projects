//import React from  'react'

//or
import React, {Component} from  'react'

import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
//import {FaPencilAlt} from 'react-icons/fa'
//import {FaTrash} from 'react-icons/fa'
import FaFloppyO from 'react-icons/lib/fa/floppy-o'


class Note extends Component {
//class Note extends React.Component {
  //constructor
  constructor(props){
    super(props)
    //add state events
    this.state = {editing: false}

    this.edit = this.edit.bind(this)
    this.remove = this.remove.bind(this)
    this.save = this.save.bind(this)

    this.renderForm = this.renderForm.bind(this)
    this.renderDisplay = this.renderDisplay.bind(this)
    this.randomBetween = this.randomBetween.bind(this)
  }

  //update style for notes (random on the screen plus rotation)
  componentWillMount(){
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150, 'px'),
      top: this.randomBetween(0, window.innerHeight - 150, 'px'),
      transform: `rotate(${this.randomBetween(-25,25,'deg')})`
    }
  }

  //highlight the text on editing
  componentDidUpdate(){
    var textArea
    if(this.state.editing) {
      textArea = this._newText
      textArea.focus()
      textArea.select()
    }
  }

  //if component not updated keep note in the same setState
  shouldComponentUpdate(nextProps, nextState){
    return(
      this.props.children !== nextProps.children || this.state !== nextState
    )
  }

  //place notes randomly on the screen
  // s - unit of measure (pix)
  randomBetween (x,y,s){
    return x + Math.ceil(Math.random() * (y-x)) + s
  }

  //edit state
  //onClick events
  edit(){
    //alert('editing note')
    this.setState({
      editing: true
    })
  }

  remove(){
    //alert('removing note')
    this.props.onRemove(this.props.index)
  }

  save(e){
    //alert('saved!')
    //alert(this._newText.value)
    e.preventDefault()
    this.props.onChange(this._newText.value, this.props.index)
    this.setState({
      editing: false
    })
  }

 //Form + updated style
  renderForm(){
    return(
      <div className = "note" style = {this.style}>
        <form onSubmit = {this.save}>
          <textarea ref = {input => this._newText = input}
                          defaultValue = {this.props.children}/>
          <button id = "save"><FaFloppyO /></button>
        </form>
      </div>
    )
  }

  //Display + updated style
  renderDisplay(){
    return(
      <div className = "note" style = {this.style}>
        <p>{this.props.children}</p>
        <span>
          <button onClick = {this.edit} id = "edit"><FaPencil /></button>
          <button onClick = {this.remove} id = "remove"><FaTrash /></button>
        </span>
      </div>
    )
  }

  //functionality
  render(){
    // if (this.state.editing){
    //   return this.renderForm()
    // }
    // else {return this.renderDisplay()}

    //or
    return this.state.editing ? this.renderForm() : this.renderDisplay()

  }
}


export default Note
