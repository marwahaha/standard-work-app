import React from 'react'
import TextField from '@material-ui/core/TextField'

export const TimeInput = ({ time, saveTime }) => {
  const getMinutes = t => Math.floor(t / 60)
  function handleMinutesUpdate(e) {
    if (e.target.value >= 0) {
      const newMinutes = Number(e.target.value)
      const timeWithoutPreviousMinutes = time - getMinutes(time) * 60
      const updatedTime = timeWithoutPreviousMinutes + newMinutes * 60
      saveTime(updatedTime)
    }
  }
  function handleSecondsUpdate(e) {
    const newSeconds = Number(e.target.value)
    const updatedTime = getMinutes(time) * 60 + newSeconds
    if (updatedTime >= 0) saveTime(updatedTime)
  }
  const minutes = getMinutes(time)
  const seconds = time - minutes * 60
  return (
    <>
      <TextField
        fullWidth
        id="standard-name"
        type="number"
        label="Minutes"
        value={minutes}
        margin="dense"
        onChange={e => handleMinutesUpdate(e)}
      />
      <TextField
        fullWidth
        id="standard-name"
        type="number"
        label="Seconds"
        value={seconds}
        margin="dense"
        onChange={e => handleSecondsUpdate(e)}
      />
    </>
  )
}
