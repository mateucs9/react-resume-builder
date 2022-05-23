// import { getData, storeData } from '../helpers/localStorage'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Resume from './display/Resume'
import ResumeForm from './form/Form'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      image: '',
      profile: '',
      profession: '',
      phone: '',
      email: '',
      linkedin: '',
      skills: [],
      experience: [],
      education: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState(prevState => {
      var obj = {}
      let { name, value } = e.target
      let [group, field, subField, index, subIndex] = name.split('-')
      let items = [...prevState[group]]
      let elemToModify = { ...items[index] }

      if (!elemToModify.hasOwnProperty(field)) {
        elemToModify[field] = []
      }

      if (group == 'skills') {
        if (typeof elemToModify[field][subIndex] === 'undefined') {
          elemToModify[field].push({})
        }
        elemToModify[field][subIndex][subField] = value
      } else if (field == 'tasks') {
        if (typeof elemToModify[field][subIndex] === 'undefined') {
          elemToModify[field].push('')
        }
        elemToModify[field][subIndex] = value
      } else {
        elemToModify[field] = value
      }

      items[index] = elemToModify

      if (!field) {
        obj[name] = value
      } else {
        obj[group] = items
      }

      return obj
    })
  }

  render () {
    return (
      <div className='App d-flex flex-row h-100'>
        <div className='form-section bg-light no-print'>
          <ResumeForm handler={this.handleChange} />
        </div>
        <div className='d-flex justify-content-center align-items-center bg-secondary no-print'>
          <FontAwesomeIcon
            icon={faArrowRight}
            size='5x'
            className='align-middle p-4 no-print'
          />
        </div>
        <div id='resume' className='resume-section border pt-5 d-flex flex-row'>
          <Resume
            name={this.state.name}
            image={this.state.image}
            profile={this.state.profile}
            profession={this.state.profession}
            phone={this.state.phone}
            email={this.state.email}
            linkedin={this.state.linkedin}
            skills={this.state.skills}
            experience={this.state.experience}
            education={this.state.education}
          />
        </div>
      </div>
    )
  }
}
