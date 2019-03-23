import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles, useTheme } from '@material-ui/styles'

export const MultiSelect = ({ children, inputLabel }) => {
  const theme = useTheme()
  const useStyles = makeStyles({
    formControl: {
      minWidth: 200,
      marginBottom: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 'auto'
    }
  })

  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="select-multiple-chip">{inputLabel}</InputLabel>
      {children}
    </FormControl>
  )
}
