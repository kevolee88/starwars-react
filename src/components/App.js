import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropdown from './Dropdown'
import CharacterProfile from './CharacterProfile'
import { getCharacters,characterSelect } from '../actions'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    this.props.getCharacters()
  }

  render() {
    const handleChange = (e, select) => {
      e.preventDefault()
      this.props.characters.forEach(character => {
        if(character.id === e.target.value) return this.props.characterSelect(character, select)
      })
    }
    return (
      <div className="ui container">
        <div className="ui stackable divided two column grid">
          <div className="column">
            <div className="ui segment">
              <Dropdown handleChange={e => handleChange(e, 'one')} characters={this.props.characters} />
              {
                this.props.selectedCharacters.one &&
                <CharacterProfile character={this.props.selectedCharacters.one} />
              }
            </div>
          </div>
          <div className="column">
            <div className="ui segment">
              <Dropdown handleChange={e => handleChange(e, 'two')} characters={this.props.characters} />
              {
                this.props.selectedCharacters.two &&
                <CharacterProfile character={this.props.selectedCharacters.two} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    characters: state.allCharacters,
    selectedCharacters: state.selectedCharacters
   }
}

export default connect(mapStateToProps, {getCharacters,characterSelect})(App)
