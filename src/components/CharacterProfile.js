import React, { Component } from 'react'
import { connect } from 'react-redux'

const CharacterProfile = ({character}) => {
  console.log(character)
  const planets = Array.isArray(character.planets) ? character.planets.map((planet,i) =>
    <li key={i}>{planet.name}</li>
  ) : <li>{character.planets.name}</li>
  const films = Array.isArray(character.films) ? character.films.map((film,i) =>
    <li key={i}>{film.title}</li>
  ) : <li>{character.films.title}</li>
  const starships = Array.isArray(character.starships) ? character.starships.map((starship,i) =>
    <li key={i}>{starship.name}</li>
  ) : <li>{character.starships.name}</li>
  const vehicles = Array.isArray(character.vehicles) ? character.vehicles.map((vehicle,i) =>
    <li key={i}>{vehicle.name}</li>
  ) : <li>{character.vehicles.name}</li>

  return (
    <div>
      <h1>{character.name}</h1>
      <h4 className="ui block top attached header">Planets</h4>
      <ul className="ui attached segment">{planets}</ul>
      <div className="ui section divider"></div>
      <h4 className="ui block top attached header">Films</h4>
      <ul className="ui attached segment">{films}</ul>
      <div className="ui section divider"></div>
      <h4 className="ui block top attached header">Starships</h4>
      <ul className="ui attached segment">{starships}</ul>
      <div className="ui section divider"></div>
      <h4 className="ui block top attached header">Vehicles</h4>
      <ul className="ui attached segment">{vehicles}</ul>
    </div>
  )
}



export default connect(null, null)(CharacterProfile)
