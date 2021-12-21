import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    personService.getAll().then((initalPersons) => {
      setPersons(initalPersons);
    });
  }, []);

  const setNotification = (message, type) => {
    setMessage(message);
    setMessageType(type);
  };

  const addPerson = (event) => {
    event.preventDefault();

    // new name check
    const foundPerson = persons.find((person) => person.name === newName);
    if (foundPerson !== undefined) {
      if (!window.confirm(`${newName} already exists, update number to ${newNumber}?`)) {
        return;
      }
      // update number
      const changedPerson = { ...foundPerson, number: newNumber };
      personService.update(foundPerson.id, changedPerson).then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== foundPerson.id ? person : changedPerson))
        );
      });
      return;
    }

    // add person if name doesn't exist
    const personObject = { name: newName, number: newNumber };
    personService
      .create(personObject)
      .then((returnedPerson) => {
        setNotification(`Added ${newName}`, 'success');
        setTimeout(() => {
          setNotification(null, null);
        }, 5000);
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        // this is the way to access the error message
        if (error.response.data.error) {
          setNotification(error.response.data.error, 'error');
          setTimeout(() => {
            setNotification(null, null);
          }, 5000);
        }
        //console.log(error.response.data);
      });
  };

  // delete person
  const deletePerson = (id) => {
    const deletedPerson = persons.find((person) => person.id === id);
    // check if person exists
    if (deletedPerson === undefined) {
      alert(`person ${id} not found`);
      return;
    }
    // confirm delete
    if (!window.confirm(`Delete ${deletedPerson.name}?`)) {
      return;
    }
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) =>
        setNotification(
          `Infomration of ${deletedPerson.name} has already been removed from the server`,
          'error'
        )
      );
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
      <Notification message={message} type={messageType} />
      <Filter onChange={inputChange} value={newFilter} />
      <h2>Add New</h2>
      <PersonForm onSubmit={addPerson} onChange={inputChange} name={newName} number={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
