import React from 'react'
import InputText from './InputText'
import { numToOrd } from './Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

export default class InputSkills extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      category: this.props.category
    }
    this.handleSelection = this.handleSelection.bind(this)
    this.getLevels = this.getLevels.bind(this)
  }

  handleSelection (e) {
    this.setState(prevState => {
      return {
        category:
          e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
      }
    })
  }

  getLevels () {
    let items
    if (this.state.category == 'Software') {
      items = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    } else {
      items = [
        'Beginner (A1)',
        'Beginner (A2)',
        'Intermediate (B1)',
        'Intermediate (B2)',
        'Advanced (C1)',
        'Advanced (C2)',
        'Native'
      ]
    }

    let children = []

    for (let item of items) {
      children.push(
        React.createElement(
          'div',
          { key: 'div-' + item, onChange: this.props.handler },
          [
            React.createElement('input', {
              type: 'radio',
              id: 'skill-selection' + this.props.num,
              name: `skills-${this.state.category.toLowerCase()}-level-0-${this
                .props.num - 1}`,
              key: 'level-' + item + this.props.num,
              value: item,
              className: 'ms-4 mb-1 me-2'
            }),
            React.createElement('label', { key: 'label-' + item }, item)
          ]
        )
      )
    }
    return React.createElement('div', { className: '' }, children)
  }

  render () {
    return (
      <div id={'skill-' + this.props.num} hidden={this.props.hidden}>
        <label className='d-flex flex-column ms-1 mt-4 mb-3 text-decoration-underline fw-bold'>
          {numToOrd(this.props.num) + ` - ${this.state.category} Skill`}
        </label>
        <InputText
          id={`skills-${this.state.category.toLowerCase()}-item-0-${this.props
            .num - 1}`}
          handler={this.props.handler}
        />
        <label className='ms-1 me-3 mt-4 fw-bold mb-2'>Level</label>
        {this.getLevels()}
        {/*Block to add new professional experiences*/}
        <div
          id={'add-section-' + this.props.num}
          hidden={!this.props.lastElement}
        >
          <a
            href='#'
            className='d-flex align-items-center mt-3 link-primary'
            onClick={this.props.addFunc}
          >
            <FontAwesomeIcon icon={faPlus} className='me-3' />
            Add another skill
          </a>
        </div>
        {/*Block to remove last professional experience input*/}
        <a
          href='#'
          className='d-flex align-items-center mt-3 link-danger'
          onClick={this.props.deleteFunc}
        >
          <FontAwesomeIcon icon={faTrash} className='me-3' />
          Delete skill
        </a>
      </div>
    )
  }
}
