import CountryButton from './CountryButton'

const CountryList = ( {countries, selectCountry} ) =>
{
	return (
		<div>
			{
				countries.map((country) =>
					{
						return (
						<div key={country.alpha3Code}>
							{country.name}
							<CountryButton country={country}
										handleClick={selectCountry}/>
						</div>
						)
					})
			}
		</div>
	)
}

export default CountryList