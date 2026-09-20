import { useAnecdotes, useCreateAnecdote, useVoteAnecdote } from './hooks'
import { useNotify } from './NotificationContext'
import Notification from './Notification'

const App = () => {
  const { data: anecdotes, isLoading, isError } = useAnecdotes()
  const createAnecdoteMutation = useCreateAnecdote()
  const voteAnecdoteMutation = useVoteAnecdote()
  const { notify } = useNotify()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    
    // Simulate server rejection for short anecdotes
    if (content.length < 5) {
      notify('too short anecdote, must have length 5 or more')
      return
    }

    event.target.anecdote.value = ''
    
    createAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          notify(`anecdote '${content}' created`)
        },
        onError: (err) => {
          const message = err.response?.data?.error || 'too short anecdote, must have length 5 or more'
          notify(message)
        }
      }
    )
  }

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(
      { ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: () => {
          notify(`anecdote '${anecdote.content}' voted`)
        }
      }
    )
  }

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      
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
