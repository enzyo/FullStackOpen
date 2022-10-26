import React from "react";

const Header = ({ header }) => <h3>{header}</h3>

const Total = ({ sum }) => 
{
	let values = Object.values(sum.map(course => course.exercises))
	return (
		<strong>total of
		{
			values.reduce((a, b) => (a + b), 0)
		}
		exercises</strong>
	)
}

const Part = ({ part }) =>
	<p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
		<Part
			key={part.id}
			part={part} 
		/>)}
  </>

const Course = ({ courses }) =>
{
	return (
		<>
		<h1>Web development curriculum</h1>
		{courses.map(course =>
		<div key={course.id}>
			<Header header={course.name} />
			<Content parts={course.parts} />
			<Total sum={course.parts}/>
		</div>
		)}
		</>
	)
}

export default Course