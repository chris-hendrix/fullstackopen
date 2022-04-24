const courseName = "Half Stack application development";
const courseParts = [
  {
    name: "Fundamentals",
    exerciseCount: 10
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14
  }
];

const Header = () => <><h1>{courseName}</h1></>

const Content = () => 
  <>
    <p>
      {courseParts[0].name} {courseParts[0].exerciseCount}
    </p>
    <p>
      {courseParts[1].name} {courseParts[1].exerciseCount}
    </p>
    <p>
      {courseParts[2].name} {courseParts[2].exerciseCount}
    </p>
  </>

const Total = () => 
  <>
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </>

const App = () => {
  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  );
};

export default App;