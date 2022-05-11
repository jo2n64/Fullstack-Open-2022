import React from 'react'

const Person = ({ id, name, number, removePerson }) => {
	return (
		<div>
			<p>{name} : {number} </p>
			<button onClick={removePerson}>remove</button>
		</div>
	)
}

export default Person