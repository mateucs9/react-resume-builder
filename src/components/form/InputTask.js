import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

export default class InputTask extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <li className='mb-2'>
        <input
          id={`experience-tasks-null-${this.props.experienceNum-1}-${this.props.num-1}`}
          name={`experience-tasks-null-${this.props.experienceNum-1}-${this.props.num-1}`}
          type='text'
		  onChange={this.props.handler}
        ></input>
        <button
          type='button'
          className='ms-3 ps-1 pe-1 btn btn-primary'
          onClick={this.props.addFunc}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          type='button'
          className='ms-3 ps-1 pe-1 btn btn-danger'
          onClick={this.props.deleteFunc}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </li>
    )
  }
}
