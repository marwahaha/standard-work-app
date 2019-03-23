import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { useTheme, makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { makeAttributeArray } from '../../helpers/makeAttributeArray'

function SwbLink({ swbId, attributeValues, swbs }) {
  const attributeStrings = makeAttributeArray(
    swbs[swbId],
    attributeValues
  ).join(' / ')

  const theme = useTheme()

  const useStyles = makeStyles({
    typography: {
      paddingLeft: theme.spacing.unit * 3.8,
      userSelect: 'none',
      textDecoration: 'none',
      borderTop: '1px solid',
      borderColor: theme.palette.grey[400]
    }
  })
  const classes = useStyles()

  return (
    <Typography
      variant="caption"
      component={RouterLink}
      activeStyle={{ background: theme.palette.grey[200] }}
      to={`/swb/${swbId}`}
      className={classes.typography}
    >
      {attributeStrings}
    </Typography>
  )
}

export default connect(
  state => ({
    attributeValues: state.attributeValues,
    swbs: state.swbs
  }),
  dispatch => ({})
)(SwbLink)
