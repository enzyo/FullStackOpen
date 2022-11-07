import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebook from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


useEffect(() =>
{
	phonebook
	.getAll()
	.then(response =>
	{
		setPersons(response.data)
		setPersonsToShow(response.data)
	})
}, [])

const addPerson = (e) => 
{
	e.preventDefault()

	//get latest data and fill local id gaps
	let newid = phonebook.getAll().then(response => setPersons(response.data))
	newid = [...persons].sort((a, b) => a.id - b.id)
	newid = newid.find((person, i) => person.id !== i + 1)
	if (newid === undefined) //no gaps found
		newid = persons.length + 1
	else newid = newid.id - 1

	let newObject = { name: newName, number: newNumber, id: newid }
	
	if (persons.some((person) => person.name === newName))
	{
		if (persons.some((person) => person.number === newNumber))
		{
			setErrorMessage(`${newName} is already added to phonebook`)
			alert(`${newName} is already added to phonebook`) //unnecessary?
		}
		else 
		{
			newObject = [...persons].find(person => person.name === newName)
			newObject = {...newObject, number: newNumber}
			phonebook.update(newObject)
			.then(updatedPerson =>
			{
				if (!updatedPerson) return //cancel
				const updatedPersons = persons.map(person =>
										person.id === updatedPerson.id ?
										updatedPerson : person)
				setPersonsToShow(updatedPersons)
				setPersons(updatedPersons)
				setMessage(`Updated ${newName}`)
			})
			.catch(error =>
			{	
				console.error('Failed: ', error.response.data)
				setErrorMessage(`Information of ${newName} has already been removed from server`)
			})
		}
	}
	else 
	{
		phonebook
			.create(newObject)
			.then((response) => 
			{
				setPersons(persons.concat(response.data))
				setPersonsToShow(personsToShow.concat(response.data))
				setMessage(`Added ${response.data.name}`)
			})
	}
	setNewName('')
	setNewNumber('')
	setTimeout(() => 
	{
		setMessage(null)
		setErrorMessage(null)
	}, 5000)	
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
		<Notification message={message} errorMessage={errorMessage}/>
		<Filter		handleSearch={handleSearch} />
    	<h2>add a new</h2>
		<PersonForm addPerson={addPerson}
	  				nameValue={newName}
					numberValue={newNumber}
	  				handleNewName={handleNewName}
	  				handleNewNumber={handleNewNumber}/>
    	<h2>Numbers</h2>
		<Persons	personsToShow={personsToShow}
	  				setPersonsToShow={setPersonsToShow}
					setPersons={setPersons}
					setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default App
