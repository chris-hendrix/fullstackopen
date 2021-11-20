import React from 'react';

const Course = ({ course }) => {
  let total;
  const getParts = () => {
    {
      total = 0;
      return course.parts.map((part) => {
        total += part.exercises;
        return <li key={part.id}>{part.name + ' ' + part.exercises}</li>;
      });
    }
  };
  console.log(getParts());
  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {getParts()}
        <li>
          <strong>total of {total} exercises</strong>
        </li>
      </ul>
    </div>
  );
};

export default Course;
