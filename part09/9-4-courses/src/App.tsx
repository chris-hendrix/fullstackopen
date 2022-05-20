interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CoursePartDescription extends CoursePartBase {
  description: string
}
interface CourseNormalPart extends CoursePartDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}
interface CourseSubmissionPart extends CoursePartDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescription {
  type: "special";
  requirements: Array<string>
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Header = ({ courseName }: { courseName: string }) => <><h1>{courseName}</h1></>

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const renderList = () => {
    switch(coursePart.type) {
      case 'normal': 
        return <>
          <li>{coursePart.description}</li>
        </>
      case 'groupProject':
        return <>
          <li>{`project exercises ${coursePart.groupProjectCount}`}</li>
        </>
      case 'submission':
        return <>
          <li>{coursePart.description}</li>
          <li>{`submit to ${coursePart.exerciseSubmissionLink}`}</li>
        </>
      case 'special':
        return <>
          <li>{coursePart.description}</li>
          <li>{`required skills: ${coursePart.requirements.join(', ')}`}</li>
        </>
      default:
        return <></>
    }
  }
  return <>
    <h3>{`${coursePart.name} ${coursePart.exerciseCount}`}</h3>
    <ul>
      {renderList()}
    </ul>
  </>
}

const Content = ({ courseParts }:{ courseParts: Array<CoursePart> }) => 
  <>
    {courseParts.map(c => <Part key={c.name} coursePart={c} />)}
  </>

const Total = ({ courseParts }:{ courseParts: Array<CoursePart> }) => 
  <>
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </>

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;