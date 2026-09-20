import useStore from './store'

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : (good / all) * 100

  if (all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const good = useStore((state) => state.good)
  const neutral = useStore((state) => state.neutral)
  const bad = useStore((state) => state.bad)
  const dispatch = useStore((state) => state.dispatch)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'NEUTRAL' })}>neutral</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
