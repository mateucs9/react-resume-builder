import React from 'react'

export default class InputText extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      description:
        this.props.id.split('-').length > 1
          ? this.props.id.split('-')[1]
          : this.props.id
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    if (nextProps) {
      return {
        description:
          nextProps.id.split('-').length > 1
            ? nextProps.id.split('-')[1]
            : nextProps.id
      }
    }
  }

  render () {
    return (
      <>
        <div className='d-flex flex-column'>
          <label className='ms-1 me-3 mt-4 fw-bold'>
            {this.state.description.charAt(0).toUpperCase()+this.state.description.slice(1)}
          </label>
          <input
            id={this.props.id.toLowerCase()}
            name={this.props.id.toLowerCase()}
            type='text'
            onChange={this.props.handler}
          />
        </div>
      </>
    )
  }
}
