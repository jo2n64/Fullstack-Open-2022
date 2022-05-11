import React from "react";

const Filter = ({ filter, handleFilter }) => {
	return (
		<div>
			<input value={filter} onChange={handleFilter}></input>
		</div>
	)
}

export default Filter