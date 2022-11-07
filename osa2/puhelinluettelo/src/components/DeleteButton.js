import phonebook from '../services/phonebook'

const DeleteButton = ( {thekey, id, name, setPersonsToShow, setPersons, setErrorMessage} ) =>
{
	return	<button	onClick={phonebook
							.delObject(	id, 
										name, 
										setPersonsToShow,
										setPersons,
										setErrorMessage )}
					key={thekey}>delete
			</button>
}

export default DeleteButton