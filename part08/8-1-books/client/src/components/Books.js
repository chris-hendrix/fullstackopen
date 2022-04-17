import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState(null)
  const [books, setBooks] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    variables: genre ? { genre } : undefined
  })

  useEffect(() => {
    if (result.loading) return
    setBooks(result.data.allBooks)
    if (books && !genres) setGenres(
      [...new Set(books.reduce((prev, book) => [...prev, ...book.genres], [])), 'all']
    )
  }, [books, genre]) // eslint-disable-line

  const handleGenreChange = (g) => {
    setGenre(g === 'all' ? null : g)
    result.refetch()
  }

  if (!props.show) return null

  if (result.loading) return <div>loading...</div>

  return (
    <div>
      <h2>books</h2>
      <h4>filter by genre</h4>
      {genres.map(g => <button key={g} onClick={() => handleGenreChange(g)}>{g}</button>)}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
