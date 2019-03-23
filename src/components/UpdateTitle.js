import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Popover from '@material-ui/core/Popover'
import CreateIcon from '@material-ui/icons/Create'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles, useTheme } from '@material-ui/styles'

export default function UpdateTitle({ title, saveTitle }) {
  const [anchorEl, setElement] = useState(null)
  const [currentTitle, setTitle] = useState(title)

  const theme = useTheme()

  const useStyles = makeStyles({
    paper: {
      padding: theme.spacing.unit
    },
    icon: {
      fontSize: 20
    }
  })

  const classes = useStyles()

  const open = Boolean(anchorEl)

  const handleTitleUpdate = event => {
    setTitle(event.target.value)
  }

  return (
    <>
      <Tooltip disableFocusListener title="Edit">
        <IconButton onClick={e => setElement(e.currentTarget)}>
          <CreateIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
      <Popover
        id="simple-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setElement(null)
          setTitle(title)
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
          <TextField
            autoComplete="off"
            autoFocus
            id="standard-name"
            label="Title"
            value={currentTitle}
            margin="normal"
            onChange={handleTitleUpdate}
          />
          <br />
          <Button
            color="primary"
            disabled={title === currentTitle || currentTitle.length < 1}
            onClick={() => {
              setElement(null)
              saveTitle(currentTitle)
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setElement(null)
              setTitle(title)
            }}
          >
            Cancel
          </Button>
        </div>
      </Popover>
    </>
  )
}
