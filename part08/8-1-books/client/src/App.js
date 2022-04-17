import { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (message) window.alert(message)

  console.log(token)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
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
