import React, { useState } from 'react'
import Popover from '@material-ui/core/Popover'
import CreateIcon from '@material-ui/icons/Create'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { TimeInput } from './TimeInput'
import { useTheme, makeStyles } from '@material-ui/styles'

export default function UpdateTime(props) {
  const initialTime = props.time
  const saveTime = props.saveTime

  const [anchorEl, setAnchor] = useState(null)
  const [time, setTime] = useState(initialTime)

  const theme = useTheme()
  const useStyles = makeStyles({
    paper: { padding: theme.spacing.unit },
    icon: { fontSize: 20 }
  })

  const classes = useStyles()

  const handleClick = event => setAnchor(event.currentTarget)

  const open = Boolean(anchorEl)

  return (
    <>
      <Tooltip disableFocusListener title="Edit Time">
        <IconButton onClick={handleClick}>
          <CreateIcon className={classes.icon} />
        </IconButton>
      </Tooltip>

      <Popover
        id="simple-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setTime(initialTime)
          setAnchor(null)
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <div className={classes.paper}>
          <TimeInput
            time={time}
            saveTime={updatedTime => setTime(updatedTime)}
          />
          <br />
          <Button
            disabled={initialTime === time}
            color="primary"
            onClick={() => {
              saveTime(time)
              setAnchor(null)
            }}
          >
            SAVE
          </Button>
          <Button
            onClick={() => {
              setTime(initialTime)
              setAnchor(null)
            }}
          >
            CANCEL
          </Button>
        </div>
      </Popover>
    </>
  )
}
