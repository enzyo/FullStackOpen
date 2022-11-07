import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>
{
	return axios.get(baseUrl)
}

const create = (newObject) =>
{
	return axios.post(baseUrl, newObject)
}

const delObject = ( id, name, setPersons, setPersonsToShow, setErrorMessage ) =>
{
	const idstr = id.toString()
	
	return (
		() =>
		{
			if (window.confirm(`Delete ${name} ?`))
			{
				axios.delete(`${baseUrl}/${idstr}`)
				.catch(error =>
				{
					console.error('failed response: ', error.response.data)
					setErrorMessage(`${name} was already deleted from server`)
					setTimeout(() =>
					{
						setErrorMessage(null)
					}, 5000)
				})
			
				getAll()
				.then(persons => 
				{
					persons = persons.data.filter(person => person.id !== id)
					setPersonsToShow(persons)
					setPersons(persons)
				})
			}
		}
	)
}

const update = (person) =>
{
	let ret = {}
	
	//confirm
	if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`))
	{
		ret = axios.put(`${baseUrl}/${person.id}`, person)
		return (ret.then(person => person.data))
	}
	
	//cancel
	ret = Promise.resolve(undefined)
	return (ret)	
}

const phonebook = { getAll, create, delObject, update }

export default phonebook