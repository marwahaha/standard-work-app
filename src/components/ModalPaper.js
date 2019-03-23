import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, useTheme } from '@material-ui/styles'

const ModalPaper = ({ children, title, closeFunction }) => {
  const theme = useTheme()
  const useStyles = makeStyles({
    paper: {
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing.unit
      },
      [theme.breakpoints.down('sm')]: {
        borderRadius: 0
      },
      padding: theme.spacing.unit * 1.5,
      marginRight: 'auto',
      marginLeft: 'auto',
      position: 'relative',
      overflow: 'auto',
      maxHeight: '100%',
      maxWidth: 960
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: 0
    }
  })
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Typography align="center" component="h6" variant="h6">
        {title}
      </Typography>
      {children}
      <IconButton onClick={closeFunction} className={classes.closeButton}>
        <CloseIcon />
      </IconButton>
    </Paper>
  )
}
export default ModalPaper
