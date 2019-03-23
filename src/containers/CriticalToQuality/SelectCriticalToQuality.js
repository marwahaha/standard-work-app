import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export default function SelectCriticalToQuality({
  ctq,
  allCtqTypes,
  saveCtqType
}) {
  function handleChange(event) {
    const saveValue = event.target.value
    saveCtqType(saveValue)
  }

  return (
    <Select
      fullWidth
      value={ctq.type_id}
      onChange={handleChange}
      inputProps={{
        name: 'age',
        id: 'age-simple'
      }}
    >
      {Object.keys(allCtqTypes).map(ctqTypeId => {
        console.log(allCtqTypes[ctqTypeId])
        return (
          <MenuItem key={ctqTypeId + ctq.id} value={ctqTypeId}>
            {allCtqTypes[ctqTypeId].desc}
          </MenuItem>
        )
      })}
    </Select>
  )
}
