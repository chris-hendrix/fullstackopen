import React from 'react';

const Persons = ({ persons, filter }) => {
  const getFilteredPersons = (text) => {
    if (text.length === 0) {
      return persons;
    }
    return persons.filter((person) => person.name.toLowerCase().startsWith(text.toLowerCase()));
  };

  return (
    <div>
      {getFilteredPersons(filter).map((person) => (
        <p key={person.name}>{person.name + ' ' + person.number}</p>
      ))}
    </div>
  );
};

export default Persons;
