import React from 'react'

const Dropdown = ({ characters, handleChange }) => {
  return (
    <div>
      <select defaultValue onChange={handleChange} className="ui fluid multiple selection dropdown">
        <option>Select a character</option>
        {characters.map((character, index) => (
          <option key={index} value={character.id}>{character.name}</option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
