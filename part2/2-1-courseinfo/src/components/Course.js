import React from 'react';

const Course = ({ course }) => {
  const getParts = () => {
    {
      return course.parts.map((part) => {
        return <li key={part.id}>{part.name + ' ' + part.exercises}</li>;
      });
    }
  };
  const getTotal = () => {
    const total = course.parts.reduce((total, part) => total + part.exercises, 0);
    return (
      <li>
        <strong>total of {total} exercises</strong>
      </li>
    );
  };
  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {getParts()} {getTotal()}
      </ul>
    </div>
  );
};

export default Course;
