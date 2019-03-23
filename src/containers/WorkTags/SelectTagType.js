import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export default function SelectWorkTags({
  workTag,
  allWorkTagTypes,
  saveWorkTagType
}) {
  function handleChange(event) {
    const saveValue = event.target.value
    saveWorkTagType(saveValue)
  }

  return (
    <Select
      fullWidth
      value={workTag.tag_type_id}
      onChange={handleChange}
      inputProps={{
        name: 'age',
        id: 'age-simple'
      }}
    >
      {Object.keys(allWorkTagTypes).map(workTagTypeId => {
        return (
          <MenuItem key={workTagTypeId + workTag.id} value={workTagTypeId}>
            {allWorkTagTypes[workTagTypeId].name}
          </MenuItem>
        )
      })}
    </Select>
  )
}
