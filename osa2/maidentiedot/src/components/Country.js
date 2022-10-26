const Country = ( {country} ) =>
{
	country = country[0]
	if (!country) return (<div></div>)
	return (
		<div>
			<h1>{country.name}</h1>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<h4>languages:</h4>
			<ul>
				{
					country.languages.map((lang) =>
					{
						return (
							<li key={country.alpha3Code.concat(lang.name)}>
								{lang.name}
							</li>
						)
						})
				}
			</ul>
			<img src={country.flags.png} alt="flag"/>
		</div>
	)
}

export default Country