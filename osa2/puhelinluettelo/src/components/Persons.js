import DeleteButton from './DeleteButton'

const Persons = ( {personsToShow, setPersonsToShow, setPersons, setErrorMessage} ) =>
{
	return (
		personsToShow.map(person =>
			<div key={person.name}>
				{person.name} {person.number} <DeleteButton thekey={'d'.concat(person.name)} 
															id={person.id}
															name={person.name}
															setPersonsToShow={setPersonsToShow}
															setPersons={setPersons}
															setErrorMessage={setErrorMessage}/>
			</div>)
	)
}

export default Persons