import React, { useState } from 'react'

export default () => {
  const [items, setItems] = useState(['HI'])
  const [newItem, setNewItem] = useState('')
  function createItem() {
    setItems(items.concat(newItem))
    setNewItem('')
  }
  return (
    <>
      <ol>
        {items.map(title => (
          <li>{title}</li>
        ))}
      </ol>
      <input
        value={newItem}
        onChange={event => setNewItem(event.target.value)}
      />
      <button onClick={createItem}>Create</button>
    </>
  )
}
