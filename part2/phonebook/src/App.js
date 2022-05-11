import { useState, useEffect } from 'react'
import numberService from './services/numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) return null

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    numberService
      .getAll()
      .then(initialNumbers => {
        console.log('promise fulfilled')
        setPersons(initialNumbers)
      })
  }

  useEffect(hook, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().startsWith(filter))

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log('Filter: ', event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
    }
    const personToFind = persons.find(person => person.name === personObj.name)
    if (personToFind) {
      window.confirm(`${personObj.name} already exists! Wanna change the number?`)
      const changedPerson = { ...personToFind, number: personObj.number }
      console.log('persons before frontend update: ', persons)
      numberService
        .update(personToFind.id, changedPerson)
        .then(returnedContact => {
          console.log('returneed contact is????: ', returnedContact)
          setPersons(persons.map(person => person.name === returnedContact.name ? returnedContact : person))
        })
        .catch(error => {
          console.log('AN ERROR HAS OCCURED??? ', error)
        })
      console.log('persons after frontend update: ', persons)
    }
    else {
      numberService
        .create(personObj)
        .then(returnedNum => {
          console.log(returnedNum)
          setPersons(persons.concat(personObj))
          setNotification(`User ${returnedNum.name} was added.`)
          setTimeout(() => { setNotification(null) }, 4000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`Name too short (must be longer than 3 characters)/number format is incorrect!`)
          setTimeout(() => { setErrorMessage(null) }, 4000)
        })
    }
  }

  const removePerson = (id) => {
    window.confirm('r u sure u want this?')
    setPersons(persons.filter(p => p.id !== id))
    numberService
      .remove(id)
      .catch(error => console.log('error: ', error))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
      <h2>Add new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App