import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import { useTheme, makeStyles } from '@material-ui/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'

export default function ActionButton({ actionFunction, toolTip }) {
  const theme = useTheme()
  const useStyles = makeStyles({
    button: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2
    }
  })
  const classes = useStyles()
  return (
    <Tooltip title={toolTip} placement="top" disableFocusListener>
      <Fab
        color="primary"
        className={classes.button}
        onClick={() => actionFunction()}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  )
}
