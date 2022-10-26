const CountryButton = ( {country, handleClick} ) =>
{
	return (
		<button onClick={() => handleClick([country])}>show</button>
	)
}

export default CountryButton