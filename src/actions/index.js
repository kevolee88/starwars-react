import axios from 'axios'
import { uid } from 'uid'
import starWarsCharacters from '../apis/star-wars-characters'

export const getCharacters =  () => async dispatch => {
  // Make first call to get number of characters

  // Expand this function
    // Make page cursor dynamic
    // Once each result comes in for each page, there will be a `next` field, that will be your cursor
    // If there is no `next` field, you can return out of the loop and assume you've reached the last page

  let characters = []
  let pageTracker = 1
  let res

  for (pageTracker; pageTracker < 20; pageTracker++) {
    res = await starWarsCharacters.get(`?page=${pageTracker}`)
    res.data.results.forEach(character => {
      let characterId = uid()
      let characterName = character.name
      let characterPlanets = character.homeworld
      let characterFilms = character.films
      let characterVehicles = character.vehicles
      let characterStarships = character.starships

      characters = [...characters, {
        id: characterId,
        name: characterName,
        planets: characterPlanets,
        films: characterFilms,
        vehicles: characterVehicles,
        starships: characterStarships
      }]
    })
    if (!res.data.next) {
      dispatch({type: 'FETCH_CHARACTERS', payload: characters})
      break
    }
  }
//
//   const res = await starWarsCharacters.get('?page=1')
//
//   const characterCount = res.data.count;
//   const pageCount = Math.ceil(characterCount / res.data.results.length)
//
//   //create list of enpoints for each page of characters
//
//     //remainingPages
//   const endpoints = () => {
//     let x = []
//     for(let i = 2; i <= pageCount; i++) {
//       x = [...x, `?page=${i}`]
//     }
//     return x
//   }
//
//   // push list of characters from first response
//   res.data.results.map(char => {
//     let newChar = {...char, uid: uid()}
//     characters.push(newChar)
//   })
//
//
// promise.all()....then(incomingcharacterresponse => characters = incomingcharacterresponse.map((character) => {field1, field3}))
//
//   // make all requests on all character pages
//   const remainingRes = await axios.all(endpoints().map((endpoint) => starWarsCharacters.get(endpoint)))
//     .then(response => {
//       response.map(data => {
//           data.data.results.map(char => {
//           let newChar = {...char, uid: uid()}
//           //push all remaining characters into character array
//           characters.push(newChar)
//         })
//       })
//     })
}

export const characterSelect = (character, select) => async dispatch => {
  let newCharacter = {...character}
  let actionType = ((sel) => {
    switch(sel) {
      case 'one':
        return 'SELECT_CHARACTER_ONE'
      case 'two':
        return 'SELECT_CHARACTER_TWO'
      default:
        return null
    }
  })(select)

  const planetsRequest = await ((planets) => {
    if (typeof planets === 'object') {
      return axios.all(planets.map(planet => starWarsCharacters.get(planet))).then(data => {
        let planetsArray = data.map(d => d.data)
        newCharacter = {...newCharacter, 'planets': planetsArray}
      })
    }
    return starWarsCharacters.get(planets).then(data => {
      newCharacter = {...newCharacter, 'planets': data.data}
    })
  })(character.planets)

  const filmsRequest = await ((films) => {
    if (typeof films === 'object') {
      return axios.all(films.map(film => starWarsCharacters.get(film))).then(data => {
        let filmsArray = data.map(d => d.data)
        newCharacter = {...newCharacter, 'films': filmsArray}
      })
    }
    return starWarsCharacters.get(films).then(data => {
      newCharacter = {...newCharacter, 'films': data.data}
    })
  })(character.films)

  const starshipsRequest = await ((starships) => {
    if (typeof starships === 'object') {
      return axios.all(starships.map(starship => starWarsCharacters.get(starship))).then(data => {
        let starshipsArray = data.map(d => d.data)
        newCharacter = {...newCharacter, 'starships': starshipsArray}
      })
    }
    return starWarsCharacters.get(starships).then(data => {
      newCharacter = {...newCharacter, 'starships': data.data}
    })
  })(character.starships)

  const vehiclesRequest = await ((vehicles) => {
    if (typeof vehicles === 'object') {
      return axios.all(vehicles.map(vehicle => starWarsCharacters.get(vehicle))).then(data => {
        let vehiclesArray = data.map(d => d.data)
        newCharacter = {...newCharacter, 'vehicles': vehiclesArray}
      })
    }
    return starWarsCharacters.get(vehicles).then(data => {
      newCharacter = {...newCharacter, 'vehicles': data.data}
    })
  })(character.vehicles)

  dispatch({type: actionType, payload: newCharacter})
}
