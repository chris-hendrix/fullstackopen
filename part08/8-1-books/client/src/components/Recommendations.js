import BookTable from "./BookTable"

const Recommendations = ({ user, show }) => {

  if (!show) return null

  const { favoriteGenre } = user

  return (
    <div>
      <h2>recommendations</h2>
      <p>based off your favorite genre</p>
      <BookTable genre={favoriteGenre} />
    </div>
  )
}

export default Recommendations
