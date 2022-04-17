import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

import BookTable from './BookTable'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) return null

  if (result.loading) return <div>loading...</div>

  const books = result.data.allBooks
  const genres = [...new Set(books.reduce((prev, book) => [...prev, ...book.genres], [])), 'all']

  return (
    <div>
      <h2>books</h2>
      <h4>genre filters</h4>
      {genres.map(g => <button key={g} onClick={() => setGenre(g === 'all' ? null : g)}>{g}</button>)}
      {books && <BookTable genre={genre} />}
    </div>
  )
}

export default Books
