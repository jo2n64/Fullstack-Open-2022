import React from 'react'

const Header = ({ course }) => {
	return (
		<>
			<h1>{course}</h1>
		</>
	)
}


const Total = ({ parts }) => {
	const sumWithInitial = parts.reduce((sum, currentPart) => {
		console.log('dafuq is going on', sum, currentPart)
		return sum + currentPart.exercises
	}, 0)
	return (
		<div>
			<p>Number of exercises {sumWithInitial}</p>
		</div>
	)
}

const Part = ({ part }) => {
	return (
		<div>
			<p key={part.id}>
				{part.name} {part.exercises}
			</p>
		</div>
	)
}

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
		</div>
	)
}

const Course = ({ course }) => {

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course