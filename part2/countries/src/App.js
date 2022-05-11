import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      <input value={filter} onChange={handleFilter}></input>
    </div>
  )
}

const Countries = (props) => {
  //console.log('amount of countries', props.countries.length)
  //console.log(props.countries)
  if (props.countries.length === 1) {
    return (
      <div>
        <Country country={props.countries[0]} />
      </div>
    )
  }
  else {
    return (
      <div>
        {props.countries.length > 10 ? <p>bro 2 many countries, pls use filter</p> :
          props.countries.map(country =>
            <Country key={country.name.common} country={country} />
          )}
      </div>
    )
  }
}

const Country = (props) => {
  const [weather, setWeather] = useState()
  const api_key = process.env.REACT_APP_API_KEY
  console.log('Country: ', props.country.name.common)
  const [isShown, setShown] = useState(false)
  const name = props.country.name.common
  const capital = props.country.capital
  const area = props.country.area
  const flag = props.country.flags.svg
  const languages = props.country.languages
  const hook = () => {
    axios
      .get('https://samples.openweathermap.org/data/2.5/weather?q=' + capital + '&appid=' + api_key)
      .then(response => {
        setWeather(response.data)
      })
  }
  useEffect(hook, [])
  if (isShown) {
    console.log('Weather in ', capital, ': ', weather)
    return (
      <div>
        <h2>{name}</h2>
        <p>capital: {capital}</p>
        <p>area: {area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={flag} width='30%' height='30%'></img>
        <button onClick={() => setShown(!isShown)}>hide</button>
        <h2>Weather in {capital}</h2>
        <p>temperature { }</p>
        <img alt='weather icon' src=''></img>
        <p>wind { }</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <p key={name}>{name}</p>
        <button onClick={() => setShown(!isShown)}>show</button>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(filter))
  const handleFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  useEffect(hook, [])
  return (
    <div>
      <h2>Filter</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Countries</h2>
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
