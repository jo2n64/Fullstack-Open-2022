import React from 'react'
const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercisesCount}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.part1} exercisesCount={props.exercises1} />
      <Part name={props.part2} exercisesCount={props.exercises2} />
      <Part name={props.part3} exercisesCount={props.exercises3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises: {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return (
    <div>
      <Header name={course.name} />
      <Content part1={course.parts[0].name} part2={course.parts[1].name} part3={course.parts[2].name}
        exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
      <Total total={sum} />
    </div>
  )
}

export default App