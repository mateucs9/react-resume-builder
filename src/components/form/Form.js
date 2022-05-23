import React from 'react'
import InputExperience from './InputExperience'
import InputText from './InputText'
import InputEducation from './InputEducation'
import InputSkills from './InputSkills'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

export default class ResumeForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      experienceHidden: true,
      numExperience: 1,
      experiences: [],
      educationHidden: true,
      numEducation: 1,
      education: [],
      numSkillsSoftware: 1,
	  numSkillsLanguage: 1,
      skills: [],
      languageSkillsHidden: true,
	  softwareSkillsHidden: true,
      profileImage: null
    }

    this.showInput = this.showInput.bind(this)

    this.addElement = this.addElement.bind(this)
    this.deleteElement = this.deleteElement.bind(this)

    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    this.fileUploadHandler = this.fileUploadHandler.bind(this)
  }

  showInput (field) {
    let obj = {}
    this.setState(() => {
      obj[field + 'Hidden'] = !this.state[field + 'Hidden']
      return obj
    })
  }

  addElement (field) {
    let obj = {}
    this.setState(() => {
      obj['num' + field] = this.state['num' + field] + 1
      return obj
    })
  }

  deleteElement (field) {
    let obj = {}
    this.setState(() => {
      obj['num' + field] = this.state['num' + field] - 1
      return obj
    })
  }

  fileSelectedHandler (event) {
    this.setState({
      profileImage: event.target.files[0]
    })
  }

  fileUploadHandler () {
    this.setState(prevState => {
      if (prevState.profileImage instanceof File) {
        let src = window.URL.createObjectURL(prevState.profileImage)
        let event = new Event('change')
        Object.defineProperty(event, 'target', {
          writable: false,
          value: {
            name: 'image',
            value: src
          }
        })
        this.props.handler(event)
        return {
          profileImage: src
        }
      }
    })
  }

  render () {
    var experiences = []
    var education = []
    var languageSkills = []
	var softwareSkills = []

    for (var i = 1; i < this.state.numExperience + 1; i++) {
      experiences.push(
        <InputExperience
          key={i}
          num={i}
          handler={this.props.handler}
          addFunc={() => this.addElement('Experience')}
          deleteFunc={() => this.deleteElement('Experience')}
          hidden={this.state.experienceHidden}
          lastElement={i === this.state.numExperience}
        />
      )
    }

    for (var i = 1; i < this.state.numEducation + 1; i++) {
      education.push(
        <InputEducation
          key={i}
          num={i}
          handler={this.props.handler}
          addFunc={() => this.addElement('Education')}
          deleteFunc={() => this.deleteElement('Education')}
          hidden={this.state.educationHidden}
          lastElement={i === this.state.numEducation}
        />
      )
    }

    for (var i = 1; i < this.state.numSkillsSoftware + 1; i++) {
      softwareSkills.push(
        <InputSkills
          key={i}
          num={i}
		  category='Software'
          handler={this.props.handler}
          addFunc={() => this.addElement('SkillsSoftware')}
          deleteFunc={() => this.deleteElement('SkillsSoftware')}
          hidden={this.state.softwareSkillsHidden}
          lastElement={i === this.state.numSkillsSoftware}
        />
      )
    }

	for (var i = 1; i < this.state.numSkillsLanguage + 1; i++) {
		languageSkills.push(
		  <InputSkills
			key={i}
			num={i}
			category='Language'
			handler={this.props.handler}
			addFunc={() => this.addElement('SkillsLanguage')}
			deleteFunc={() => this.deleteElement('SkillsLanguage')}
			hidden={this.state.languageSkillsHidden}
			lastElement={i === this.state.numSkillsLanguage}
		  />
		)
	  }

    return (
      <>
        <form
          className='d-flex flex-column p-3 overflow-auto mh-100'
          autoComplete='off'
        >
          <h2 className='mb-4'>Insert your information</h2>
          <div id='image-upload' className='d-flex flex-column'>
            <label className='mb-3'>Profile Image</label>
            <input type='file' onChange={this.fileSelectedHandler}></input>
            <button
              type='button'
              className='btn btn-primary mt-3 w-50'
              onClick={this.fileUploadHandler}
            >
              Upload
            </button>
          </div>

          <div className='col xs-2 d-flex flex-column'>
            <InputText id='Name' handler={this.props.handler} />
            <InputText id='Profession' handler={this.props.handler} />
            <InputText id='Phone' handler={this.props.handler} />
            <InputText id='Email' handler={this.props.handler} />
            <InputText id='Linkedin' handler={this.props.handler} />
          </div>
          <label className='ms-1 me-3 mt-4'>Profile</label>
          <textarea
            id='profile'
            name='profile'
            placeholder=''
            onChange={this.props.handler}
          />

          <div id='experience-input' className='ms-1 me-3 mt-4'>
            <a
              href='#'
              className='d-flex align-items-center'
              onClick={() => this.showInput('experience')}
            >
              <FontAwesomeIcon
                icon={faPlus}
                size='2x'
                className={
                  !this.state.experienceHidden
                    ? 'rotate down me-2'
                    : 'rotate  me-2'
                }
              />
              {(this.state.experienceHidden ? 'Add' : 'Hide') +
                ' Professional Experience'}
            </a>
            {experiences}
          </div>
          <div id='education-input' className='ms-1 me-3 mt-4'>
            <a
              href='#'
              className='d-flex align-items-center'
              onClick={() => this.showInput('education')}
            >
              <FontAwesomeIcon
                icon={faPlus}
                size='2x'
                className={
                  !this.state.educationHidden
                    ? 'rotate down me-2'
                    : 'rotate  me-2'
                }
              />
              {(this.state.educationHidden ? 'Add' : 'Hide') + ' Education'}
            </a>
            {education}
          </div>
          <div id='software-skills-input' className='ms-1 me-3 mt-4'>
            <a
              href='#'
              className='d-flex align-items-center'
              onClick={() => this.showInput('softwareSkills')}
            >
              <FontAwesomeIcon
                icon={faPlus}
                size='2x'
                className={
                  !this.state.softwareSkillsHidden ? 'rotate down me-2' : 'rotate  me-2'
                }
              />
              {(this.state.softwareSkillsHidden ? 'Add' : 'Hide') + ' Software Skills'}
            </a>
            {softwareSkills}
          </div>
		  <div id='language-skills-input' className='ms-1 me-3 mt-4'>
            <a
              href='#'
              className='d-flex align-items-center'
              onClick={() => this.showInput('languageSkills')}
            >
              <FontAwesomeIcon
                icon={faPlus}
                size='2x'
                className={
                  !this.state.languageSkillsHidden ? 'rotate down me-2' : 'rotate  me-2'
                }
              />
              {(this.state.languageSkillsHidden ? 'Add' : 'Hide') + ' Language Skills'}
            </a>
            {languageSkills}
          </div>
        </form>
      </>
    )
  }
}

export function numToOrd (num) {
  var lastNum = String(num).slice(String(num).length - 1)
  var last2Num = String(num).slice(String(num).length - 2)
  if (lastNum === '1' && last2Num !== '11') {
    return num + 'st'
  } else if (lastNum === '2' && last2Num !== '12') {
    return num + 'nd'
  } else if (lastNum === '3' && last2Num !== '13') {
    return num + 'rd'
  } else {
    return num + 'th'
  }
}
