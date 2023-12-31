import { deleteById } from '../services/personsServices'
import PropTypes from 'prop-types'

const Persons = ({ filter, filtered, persons, setPersons }) => {

  const deleteHandler = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      deleteById(id)
        .then(res => {
          if(res.status === 200) console.log('Successfully deleted');
        })
      setPersons(persons.filter(person => person.id !== id))
    }  
  }

  return (
    <div>
      {(filtered.length > 0 ? 
          filtered.map(elem => <div key={elem.name}>{elem.name} {elem.number} <button onClick={() => deleteHandler(elem.id, elem.name)}>delete</button></div>) : 
          filter ? 
            <span>No results</span> : 
            persons.map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => deleteHandler(person.id, person.name)}>delete</button></div>))} 
    </div>
  )
}

Persons.propTypes = {
  filter: PropTypes.bool,
  filtered: PropTypes.arrayOf(PropTypes.object),
  persons: PropTypes.arrayOf(PropTypes.object),
  setPersons: PropTypes.func,
};

export default Persons
