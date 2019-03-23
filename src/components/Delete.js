import React, { useState } from 'react'
import Popover from '@material-ui/core/Popover'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles, useTheme } from '@material-ui/styles'

const DeleteElement = ({ handleDelete, title }) => {
  const [anchorEl, setAnchor] = useState(null)
  const theme = useTheme()

  const useStyles = makeStyles({
    smallIcon: {
      fontSize: 20
    },
    paper: {
      padding: theme.spacing.unit
    }
  })

  const classes = useStyles()

  const handleClick = event => setAnchor(event.currentTarget)

  const handleClose = () => setAnchor(null)

  const open = Boolean(anchorEl)

  return (
    <>
      <Tooltip disableFocusListener title={`Delete ${title ? title : ''}`}>
        <IconButton onClick={handleClick}>
          <DeleteIcon className={classes.smallIcon} />
        </IconButton>
      </Tooltip>
      <Popover
        id="simple-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
          <Typography style={{ textAlign: 'center' }} variant="subtitle1">
            Delete?
          </Typography>
          <Button size="small" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button size="small" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Popover>
    </>
  )
}

export default DeleteElement
