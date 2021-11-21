import React, { useState } from 'react';

const Filter = ({ onChange, value }) => {
  return (
    <div>
      filter: <input id='filter' onChange={onChange} value={value} />
    </div>
  );
};

const PersonForm = ({ onSubmit, onChange, name, number }) => {
  return (
    <form>
      <div>
        name: <input id='name' onChange={onChange} value={name} />
      </div>
      <div>
        number: <input id='number' onChange={onChange} value={number} />
      </div>
      <div>
        <button onClick={onSubmit} type='submit'>
          add
        </button>
      </div>
    </form>
  );
};

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto', number: '040-123456', id: 1 },
    { name: 'Ada', number: '39-44-5323523', id: 2 },
    { name: 'Dan', number: '12-43-234345', id: 3 },
    { name: 'Mary', number: '39-23-6423122', id: 4 },
    { name: 'Daniel', number: '39-23-6423122', id: 5 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    // new name check
    if (persons.filter((person) => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // add person
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  };

  const inputChange = (event) => {
    switch (event.target.id) {
      case 'name':
        setNewName(event.target.value);
        break;
      case 'number':
        setNewNumber(event.target.value);
        break;
      case 'filter':
        setNewFilter(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={inputChange} value={newFilter} />
      <h2>Add New</h2>
      <PersonForm onSubmit={addPerson} onChange={inputChange} name={newName} number={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
