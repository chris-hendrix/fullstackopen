import React from 'react';

const Persons = ({ persons, filter, deletePerson }) => {
  const getFilteredPersons = (text) => {
    if (text.length === 0) {
      return persons;
    }
    return persons.filter((person) => person.name.toLowerCase().startsWith(text.toLowerCase()));
  };

  return (
    <div>
      {getFilteredPersons(filter).map((person) => (
        <p key={person.name}>
          {person.name + ' ' + person.number + ' '}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
