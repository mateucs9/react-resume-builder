import React from 'react'
import InputText from './InputText'
import {numToOrd} from './Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

export default class InputEducation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isDisabled: false
    }
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  handleCheckbox (e) {
    this.setState(prevState => {
      return {
        isDisabled: !prevState.isDisabled
      }
    })
  }

  render () {
    return (
      <div id={'education-' + this.props.num} hidden={this.props.hidden}>
        <label className='ms-1 mt-4'>
          <b>
            <u>{numToOrd(this.props.num) + ' - Education'}</u>
          </b>
        </label>
        {/*Company selection*/}
        <InputText
          id={`education-Institution-null-${this.props.num-1}-0`}
          handler={this.props.handler}
        />
        {/*Position selection*/}
        <InputText
          id={`education-Certificate-null-${this.props.num-1}-0`}
          handler={this.props.handler}
        />
        {/*Period selection*/}
        <b>
          <label className='ms-1 mt-3'>Period</label>
        </b>
        <div className='current-job ms-1 mt-3'>
          <input
            id={'education-current-' + this.props.num}
            name={'education-current-' + this.props.num}
            type='checkbox'
            value='false'
            onChange={this.handleCheckbox}
            className='p-2'
          />
          <label className='ms-2'>Are you still studying here?</label>
        </div>
        <div className='date-selection d-flex flex-row ms-1 mt-3'>
          <div className='date-from-selection d-flex flex-column'>
            <label>From</label>
            <input
              id={`education-from-null-${this.props.num-1}-0`}
              name={`education-from-null-${this.props.num-1}-0`}
              onChange={this.props.handler}
              type='date'
            ></input>
          </div>
          <div className='date-to-selection ms-3 d-flex flex-column'>
            <label>To</label>
            <input
              id={`education-to-null-${this.props.num-1}-0`}
              name={`education-to-null-${this.props.num-1}-0`}
              onChange={this.props.handler}
              type='date'
              disabled={this.state.isDisabled}
            ></input>
          </div>
        </div>
        {/*Block to add new professional educations*/}
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
            Add another education
          </a>
        </div>
        {/*Block to remove last professional education input*/}
        <a
          href='#'
          className='d-flex align-items-center mt-3 link-danger'
          onClick={this.props.deleteFunc}
        >
          <FontAwesomeIcon icon={faTrash} className='me-3' />
          Delete education
        </a>
      </div>
    )
  }
}
