import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'
import CountryList from './components/CountryList'

const App = () =>
{
	const [searchStr, setSearchStr] = useState('')
	const [countryData, setCountryData] = useState([])
	const [dataToShow, setDataToShow] = useState([])

	useEffect(() =>
	{
		axios.get('https://restcountries.com/v2/all')
			.then(response =>
				{
					setCountryData(response.data)
				})
	}, [])

	const handleSearch = (e) =>
	{
		let filterResult = []
		
		setSearchStr(e.target.value)
		filterResult = countryData.filter(country =>
						country.name.toLowerCase().includes(e.target.value.toLowerCase()))
		setDataToShow(filterResult)
	}

	return (
		<>
		<div>find countries <input value={searchStr} onChange={handleSearch}></input></div>
		{
			searchStr === '' ?
			<></>:
			dataToShow.length > 10 ?
			<>Too many matches, specify another filter</>:
			dataToShow.length > 1 ?
			<CountryList countries={dataToShow} selectCountry={setDataToShow}/>:
			<Country country={dataToShow} />
		} </>	
	)
}

export default App;
