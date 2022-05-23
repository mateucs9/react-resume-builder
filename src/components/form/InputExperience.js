import React from 'react'
import InputText from './InputText'
import InputTask from './InputTask'
import {numToOrd} from './Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

export default class InputExperience extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isDisabled: false,
      numTasks: 1,
      tasks: []
    }
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.addTask = this.addTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }

  handleCheckbox (e) {
    this.setState(prevState => {
      return {
        isDisabled: !prevState.isDisabled
      }
    })
  }

  addTask () {
    this.setState(prevState => {
      return {
        numTasks: prevState.numTasks + 1
      }
    })
  }

  deleteTask () {
    if (this.state.numTasks > 1) {
      this.setState(prevState => {
        return {
          numTasks: prevState.numTasks - 1
        }
      })
    }
  }

  render () {
    var tasks = []
    for (var i = 1; i < this.state.numTasks + 1; i++) {
      tasks.push(
        <InputTask
          key={i}
          num={i}
          experienceNum={this.props.num}
          handler={this.props.handler}
          addFunc={this.addTask}
          deleteFunc={this.deleteTask}
        />
      )
    }

    return (
      <div id={'experience-' + this.props.num} hidden={this.props.hidden}>
        <label className='ms-1 mt-4'>
          <b>
            <u>{numToOrd(this.props.num) + ' Experience'}</u>
          </b>
        </label>
        {/*Company selection*/}
        <InputText
          id={`experience-Company-null-${this.props.num-1}-0`}
          handler={this.props.handler}
        />
        {/*Position selection*/}
        <InputText
          id={`experience-Position-null-${this.props.num-1}-0`}
          handler={this.props.handler}
        />
        {/*Period selection*/}
        <b>
          <label className='ms-1 mt-3'>Period</label>
        </b>
        <div className='current-job ms-1 mt-3'>
          <input
            id={'experience-current-' + this.props.num}
            name={'experience-current-' + this.props.num}
            type='checkbox'
            value='false'
            onChange={this.handleCheckbox}
            className='p-2'
          />
          <label className='ms-2'>Do you still work here?</label>
        </div>
        <div className='date-selection d-flex flex-row ms-1 mt-3'>
          <div className='date-from-selection d-flex flex-column'>
            <label>From</label>
            <input
              id={`experience-from-null-${this.props.num-1}-0`}
              name={`experience-from-null-${this.props.num-1}-0`}
              onChange={this.props.handler}
              type='date'
            ></input>
          </div>
          <div className='date-to-selection ms-3 d-flex flex-column'>
            <label>To</label>
            <input
              id={`experience-to-null-${this.props.num-1}-0`}
              name={`experience-to-null-${this.props.num-1}-0`}
              onChange={this.props.handler}
              type='date'
              disabled={this.state.isDisabled}
            ></input>
          </div>
        </div>
        {/*Responsabilities Section*/}
        <b>
          <label className='mt-3 mb-3'>Tasks/Responsabilities</label>
          <ul>{tasks}</ul>
        </b>
        {/*Block to add new professional experiences*/}
        <div
          id={'add-section-' + this.props.num}
          hidden={!this.props.lastElement}
        >
          <a
            href='#'
            className='d-flex align-items-center mt-5 link-primary'
            onClick={this.props.addFunc}
          >
            <FontAwesomeIcon icon={faPlus} className='me-3' />
            Add another experience
          </a>
        </div>
        {/*Block to remove last professional experience input*/}
        <a
          href='#'
          className='d-flex align-items-center mt-3 link-danger'
          onClick={this.props.deleteFunc}
        >
          <FontAwesomeIcon icon={faTrash} className='me-3' />
          Delete experience
        </a>
      </div>
    )
  }
}
