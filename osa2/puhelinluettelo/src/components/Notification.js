const Notification = ({ message, errorMessage }) =>
{
	if (message === null && errorMessage === null) return null
	return (
		<div className={message ? 'message' : 'error'}>
			{message ? message : errorMessage}
		</div>
	)
}

export default Notification