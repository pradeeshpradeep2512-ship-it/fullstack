import { useAnecdotes, useCreateAnecdote, useVoteAnecdote } from './hooks'
import { useState } from 'react'

const App = () => {
  const { data: anecdotes, isLoading, isError } = useAnecdotes()
  const createAnecdoteMutation = useCreateAnecdote()
  const voteAnecdoteMutation = useVoteAnecdote()
  
  const [errorMsg, setErrorMsg] = useState('')

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    
    // Simulate server rejection for short anecdotes
    if (content.length < 5) {
      setErrorMsg('too short anecdote, must have length 5 or more')
      setTimeout(() => setErrorMsg(''), 5000)
      return
    }

    event.target.anecdote.value = ''
    
    createAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onError: (err) => {
          const message = err.response?.data?.error || 'Failed to create anecdote'
          setErrorMsg(message)
          setTimeout(() => setErrorMsg(''), 5000)
        }
      }
    )
  }

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  // Sort by votes descending
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      {errorMsg && <div style={{ color: 'red', marginBottom: 10 }}>{errorMsg}</div>}
      
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
