import React from 'react'

const Form = ({ submitHandler, inputNameHandler, inputNumberHandler, name, number }) => {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          name: <input onChange={inputNameHandler} value={name} />
        </div>

        <div>
          number: <input onChange={inputNumberHandler} value={number} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Form
