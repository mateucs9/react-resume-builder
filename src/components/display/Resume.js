import React from 'react'
import defaultText from './DefaultText.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default class Resume extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: this.props.name === '' ? defaultText['name'] : this.props.name,
      image: this.props.image === '' ? defaultText['image'] : this.props.image,
      profile:
        this.props.profile === '' ? defaultText['profile'] : this.props.profile,
      profession:
        this.props.profession === ''
          ? defaultText['profession']
          : this.props.profession,
      phone: this.props.phone === '' ? defaultText['phone'] : this.props.phone,
      email: this.props.email === '' ? defaultText['email'] : this.props.email,
      linkedin:
        this.props.linkedin === ''
          ? defaultText['linkedin']
          : this.props.linkedin,
      skills:
        this.props.skills.length === 0
          ? defaultText['skills']
          : this.props.skills,
      experience:
        this.props.experience.length === 0
          ? defaultText['experience']
          : this.props.experience,
      education:
        this.props.education.length === 0
          ? defaultText['education']
          : this.props.education
    }

    this.getDetailedSection = this.getDetailedSection.bind(this)
    this.getSkills = this.getSkills.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState(() => {
      var obj = {}
      for (var prop of Object.keys(nextProps)) {
        if (nextProps[prop].length === 0) {
          obj[prop] = defaultText[prop]
        } else {
          obj[prop] = nextProps[prop]
        }
      }
      return obj
    })
  }

  getDetailedSection (field) {
    // This will add leading zeros if necessary
    function pad (num, size) {
      num = num.toString()
      while (num.length < size) num = '0' + num
      return num
    }

    let divs = []
    for (let [index, item] of this.state[field].entries()) {
      var from = new Date(item.from)
      var to = new Date(item.to)

      from = isNaN(from.getMonth())
        ? '01-1900'
        : pad(from.getMonth() + 1, 2) + '.' + from.getFullYear()
      to = isNaN(to.getMonth())
        ? 'Present'
        : pad(to.getMonth() + 1, 2) + '.' + to.getFullYear()

      divs.push(
        //Adding company/institution name
        React.createElement(
          'h3',
          { key: 'h3' + field + index, className: 'mt-2' },
          field == 'experience' ? item.company : item.institution
        ),
        // Adding div to pack the row with the position and time frame
        React.createElement(
          'div',
          {
            key: 'div' + field + index,
            className:
              'd-flex flex-row justify-content-between align-items-center'
          },
          [
            // Adding the title of the position
            React.createElement(
              'h6',
              { key: 'h61' + field + index, className: 'me-3 fst-italic' },
              field == 'experience' ? item.position : item.certificate
            ),
            // Adding the position time frame
            React.createElement(
              'h6',
              { key: 'h62' + field + index, className: 'me-3 fst-italic' },
              from + ' - ' + to
            )
          ]
        )
      )

      // If tasks have been already added, we create the list with the elements
      if (item.tasks) {
        let tasks = Array.from(item.tasks.entries()).map(task =>
          React.createElement('li', { key: 'li' + task[0] + 1 }, task[1])
        )
        tasks = React.createElement(
          'ul',
          { key: 'ul' + field + index, className: 'ms-5' },
          tasks
        )

        divs.push(tasks)
      }
    }

    if (divs.length !== 0) {
      return React.createElement('div', {}, divs)
    }
  }

  getSkills () {
    let children = []

    for (let key of Object.keys(this.state.skills[0])) {
      let skills = []

      for (let skill of this.state.skills[0][key]) {
        skills.push(
          React.createElement(
            'li',
            { key: `li-${key}-${skill.item}` },
            React.createElement(
              'p',
              { className: 'fw-normal' },
              `${skill.item}: ${skill.level || 'Beginner'}`
            )
          )
        )
      }

      if (skills.length !== 0) {
        children.push(
          React.createElement(
            'div',
            { key: 'p' + key, className: 'text-center fw-bold' },
            key.charAt(0).toUpperCase() + key.slice(1),
            React.createElement(
              'div',
              { key: 'div' + key, className: 'mt-3' },
              [React.createElement('ul', { key: 'ul' + key }, skills)]
            )
          )
        )
      }
    }
    if (children.length !== 0) {
      return React.createElement(
        'div',
        { className: 'd-flex flex-row justify-content-around' },
        children
      )
    }
  }

  render () {
    return (
      <>
	  
        <div
          id='resume-lateral-section'
          className='border-right border-primary ps-3 pe-5 ms-3'
        >
          <img
            src={this.state.image}
            alt='profile'
            width='200'
            height='200'
          ></img>
          <h2 className='ms-2 mt-3 w-100'>{this.state.name}</h2>
          <h4 className='ms-2 font-italic'>{this.state.profession}</h4>
          <div className='d-flex flex-row align-items-center pt-3'>
            <FontAwesomeIcon icon={faPhone} size='2x' />
            <p className='ms-3'>{this.state.phone}</p>
          </div>
          <div className='d-flex flex-row align-items-center pt-3'>
            <FontAwesomeIcon icon={faEnvelope} size='2x' />
            <p className='ms-3'>{this.state.email}</p>
          </div>
          <div className='d-flex flex-row align-items-center pt-3'>
            <FontAwesomeIcon icon={faLinkedin} size='2x' />
            <a className='ms-3' href={this.state.linkedin}>
              {this.state.linkedin}
            </a>
          </div>
        </div>
        <div id='resume-central-section' className='position-relative ms-4 me-4'>
		<button
          id='print-btn'
          className='btn btn-info no-print'
          onClick={window.print}
        >
          Export as PDF
        </button>
          <div>
            <h1 className=''>Profile</h1>
          </div>
          <p id='Profile' className='text-justify me-3'>
            {this.state.profile}
          </p>
          <hr></hr>
          <h1 className=''>Professional Experience</h1>
          {this.getDetailedSection('experience')}
		  <hr></hr>
          <h1 className=''>Education</h1>
          {this.getDetailedSection('education')}
          <hr></hr>
          <h1 className=''>Skills</h1>
          {this.getSkills()}
        </div>
      </>
    )
  }
}
