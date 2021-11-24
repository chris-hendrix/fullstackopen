import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((initalPersons) => {
      setPersons(initalPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    // new name check
    if (persons.filter((person) => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // add person
    const personObject = { name: newName, number: newNumber };
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    });
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
