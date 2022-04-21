import { useState } from 'react'

const Button = ({ handleClick, text }) => (<button onClick={handleClick}>{text}</button>)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine name='good' value={props.good} />
          <StatisticLine name='neutral' value={props.neutral} />
          <StatisticLine name='bad' value={props.bad} />
          <StatisticLine name='all' value={props.all} />
          <StatisticLine name='average' value={props.avg / props.all * 1.0} />
          <StatisticLine name='neutral' value={props.good / props.all * 100.0 + '%'} />
        </tbody>
      </table>
    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)

  const handleGoodClicks = () => {
    setAll(all + 1)
    setAvg(avg + 1)
    setGood(good + 1)

  }
  const handleNeutralClicks = () => {
    setAll(all + 1)
    setAvg(avg)
    setNeutral(neutral + 1)
  }
  const handleBadClicks = () => {
    setAll(all + 1)
    setAvg(avg - 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClicks} text='good' />
      <Button handleClick={handleNeutralClicks} text='neutral' />
      <Button handleClick={handleBadClicks} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} avg={avg} all={all} />
    </div>
  )
}
export default App