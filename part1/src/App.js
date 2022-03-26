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
      <Part name={props.parts[0]} exercisesCount={props.exercises[0]} />
      <Part name={props.parts[1]} exercisesCount={props.exercises[1]} />
      <Part name={props.parts[2]} exercisesCount={props.exercises[2]} />
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
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]
  const sum = exercises[0] + exercises[1] + exercises[2]
  return (
    <div>
      <Header name={course} />
      <Content parts={parts} exercises={exercises} />
      <Total total={sum} />
    </div>
  )
}

export default App