import React from 'react'

const Notification = ({ message, type }) => {
  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification
