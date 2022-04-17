import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR } from '../queries'

const BornForm = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [setBornTo] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()

    setBornTo({ variables: { name, setBornTo: born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>set birth year</h2>

      <form onSubmit={submit}>
        <div>
          <select defaultValue={authors[0].name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a, i) => (<option key={a.name} value={a.name} >{a.name}</option>))}
          </select>
        </div>
        <div>
          year{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value, 10))}
          />
        </div>
        <button type='submit'>set birth year</button>
      </form>
    </div>
  )
}

export default BornForm