import { useQuery } from '@apollo/client'

import BornForm from './BornForm'
import { ALL_AUTHORS } from '../queries'

const Authors = ({ token, show }) => {
  const result = useQuery(ALL_AUTHORS)

  if (!show) return null

  if (result.loading) return <div>loading...</div>

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.length > 0 && authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && authors.length && <BornForm authors={authors} />}
    </div>
  )
}

export default Authors
