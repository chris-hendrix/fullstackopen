import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto', number: '040-123456', id: 1 },
    { name: 'Ada', number: '39-44-5323523', id: 2 },
    { name: 'Dan', number: '12-43-234345', id: 3 },
    { name: 'Mary', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const getFilteredPersons = (text) => {
    if (text.length === 0) {
      return persons;
    }
    return persons.filter((person) => person.name.toLowerCase().startsWith(text));
  };

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
      <div>
        filter: <input id='filter' onChange={inputChange} value={newFilter} />
      </div>
      <h2>Add New</h2>
      <form>
        <div>
          name: <input id='name' onChange={inputChange} value={newName} />
        </div>
        <div>
          number: <input id='number' onChange={inputChange} value={newNumber} />
        </div>
        <div>
          <button onClick={addPerson} type='submit'>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {getFilteredPersons(newFilter).map((person) => (
        <p key={person.name}>{person.name + ' ' + person.number}</p>
      ))}
    </div>
  );
};

export default App;
