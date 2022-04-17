import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const BookTable = ({ genre }) => {
  const result = useQuery(ALL_BOOKS, {
    variables: genre ? { genre } : undefined
  })

  useEffect(() => result.refetch(), [genre]) // eslint-disable-line

  if (result.loading) return <div>loading...</div>

  const books = result.data.allBooks

  return (
    <>
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
      {genre && <h5>{`filtered by genre: ${genre}`}</h5>}
    </>
  )
}

export default BookTable
