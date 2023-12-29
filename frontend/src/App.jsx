import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import { create, getAll, updateById } from './services/personsServices'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, SetNewNumber ] = useState('')
  const [ filtered, setFiltered ] = useState([])
  const [ filter, setFilter ] = useState(false)
  const [ filterWord, setFilterWord ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    getAll().then(persons => setPersons(persons))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const exist = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if(exist) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updateById(exist.id, { name: exist.name, number: newNumber })
          .then(res => {
            setPersons(persons.map(person => person.id !== exist.id ? person : res))
            setMessage({text:`${exist.name}'s number was updated`, type: 'success'})
            setNewName('')
            SetNewNumber('')
            setTimeout(() => {
              setMessage(null)
            }, 4000)
          })
          .catch(error => {
            // console.log(error.response.data.error);
            // setMessage({text:`Information of ${exist.name} has already been removed from server`, type: 'error'})
            setMessage({text:`${error.response.data.error}`, type: 'error'})
            setTimeout(() => {
              setMessage(null)
            }, 4000)
          })
      }
      return;
    }

    create({ name: newName, number: newNumber })
     .then(person => {
      setPersons(persons.concat(person))
      setMessage({text:`Added ${newName}`, type: 'success'})
      setNewName('')
      SetNewNumber('')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
     })
     .catch(error => {
      if (error.response && error.response.data) {
        console.log(error.response.data.error);
        setMessage({text:`${error.response.data.error}`, type: 'error'})
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      } else {
        console.log('An error occurred:', error.message);
      }
     })
    
  }

  const handleInputName = (e) => {
    setNewName(e.target.value)
  }

  const handleInputNumber = (e) => {
    SetNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase().trim();
    if(value) {
      setFiltered(persons.filter(person => person.name.toLowerCase().includes(value)))
      setFilter(true)
    } else {
      setFiltered([])
      setFilter(false)
    }
  }

  useEffect(() => {
    if(filterWord.length > 0) {
      setFiltered(persons.filter(person => person.name.toLowerCase().includes(filterWord)))
      setFilter(true)
    } else {
      setFiltered([])
      setFilter(false)
    }
  }, [filterWord])

  const handleFilter2 = (e) => {
    const value = e.target.value.toLowerCase().trim()
    setFilterWord(value)
  }

  return (
    <div>
      {message && <Notification message={message.text} type={message.type}/>}
      <h2>Phonebook</h2>
      <Filter handler={handleFilter2} />
      
      <h3>Add a new</h3>
      <Form submitHandler={handleSubmit} inputNameHandler={handleInputName} inputNumberHandler={handleInputNumber} name={newName} number={newNumber} />

      <h2>Numbers</h2>
      <Persons filter={filter} filtered={filtered} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App