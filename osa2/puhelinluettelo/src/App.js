import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

useEffect(() =>
{
	axios.get('http://localhost:3001/persons')
		.then(response =>
			{
				setPersons(response.data)
				setPersonsToShow(response.data)
			})
}, [])

  const addPerson = (e) => 
  {
	  e.preventDefault()
	  let newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
	  if (persons.some((person) => person.name === newName))
		{
			alert(`${newName} is already added to phonebook`)
		}
	  else 
		{
			setPersons(persons.concat(newPerson))
			setPersonsToShow(personsToShow.concat(newPerson))
		}
	  setNewName('')
	  setNewNumber('')
  }
  const handleSearch = (e) =>
  {
	let text = e.target.value.toLowerCase()
	let filteredPersons = persons.filter((person) => 
			(person.name.toLowerCase().includes(text) ||
			person.number.includes(text.toString())))
	setPersonsToShow(filteredPersons)
  }
  const handleNewName = (e) =>
  {
	  setNewName(e.target.value)
  }
  const handleNewNumber = (e) =>
  {
	  setNewNumber(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
	  <Filter handleSearch={handleSearch} />
      <h2>add a new</h2>
	  <PersonForm addPerson={addPerson}
	  				nameValue={newName}
					numberValue={newNumber}
	  				handleNewName={handleNewName}
	  				handleNewNumber={handleNewNumber}/>
      
      <h2>Numbers</h2>
	  <Persons personsToShow={personsToShow}/>
 
    </div>
  )
}

export default App
