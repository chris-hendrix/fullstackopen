import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { updateCache } from '../App'
import { CREATE_BOOK, ALL_BOOKS } from '../queries'



const NewBook = ({ setPage, show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.bookAdded)
    }
  })

  if (!show) return null

  const submit = async (event) => {
    event.preventDefault()
    createBook(
      { variables: { title, author, published, genres } }
    ).then(res => {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
        setPage('books')
      })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value, 10))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
