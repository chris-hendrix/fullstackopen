import { useEffect, useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import { CURRENT_USER, BOOK_ADDED } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const bookAdded = subscriptionData.data.bookAdded
      window.alert(`book added: ${bookAdded.title}`)
    },
  })

  const result = useQuery(CURRENT_USER)

  useEffect(() => {
    if (result.loading) return
    setUser(result.data.me)
  }, [result.data]) // eslint-disable-line

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  if (message) window.alert(message)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recs')}>recommendations</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => {
          logout()
          setPage('authors')
        }}>
          logout
        </button>}
      </div>

      <Authors token={token} show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook setPage={setPage} show={page === 'add'} />
      <Recommendations user={user} show={page === 'recs'} />
      <LoginForm
        setToken={setToken}
        setMessage={setMessage}
        setPage={setPage}
        show={page === 'login'}
      />
    </div>
  )
}

export default App
