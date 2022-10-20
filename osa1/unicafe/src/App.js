import { useState } from 'react'

const Button = (props) =>
{
	return (
	<button
		onClick = {props.handleClick}>
		{props.text}
	</button>
	)
}

const StatisticLine = (props) =>
{
	return (<tr><td>{props.text}</td><td>{props.value}</td></tr>)
}

const Statistics = (props) =>
{
	var all = props.good + props.neutral + props.bad
	var average = (props.good - props.bad) / all
	var positive = props.good / all * 100

	if (all === 0) return (<p>No feedback given</p>)
	return (
		<div><table><tbody>
			<StatisticLine text = "good" value = {props.good} />
			<StatisticLine text = "neutral" value = {props.neutral} />
			<StatisticLine text = "bad" value = {props.bad} />
			<StatisticLine text = "all" value = {all} />
			<StatisticLine text = "average" value = {average} />
			<StatisticLine text = "positive" value = {positive + ' %'} />
		</tbody></table></div>
	)
}

const App = () =>
{
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const addRating = rating =>
	{
		if (rating === 1) setGood(good + 1)
		if (rating === 0) setNeutral(neutral + 1)
		if (rating === -1) setBad(bad + 1)
	}
	return (
	<div>
		<h2>give feedback</h2>
		<Button handleClick = {() => addRating(1)} text = "Good" />
		<Button handleClick = {() => addRating(0)} text = "Neutral" />
		<Button handleClick = {() => addRating(-1)} text = "Bad" />
		<h2>statistics</h2>
		<Statistics good = {good} neutral = {neutral} bad = {bad} />
	</div>
	)
}

export default App