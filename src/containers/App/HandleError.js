import React from 'react'
import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import { clearError } from '../../actions'
import { useTheme, makeStyles } from '@material-ui/styles'

const Error = ({ errorData, clearError }) => {
  const theme = useTheme()
  const useStyles = makeStyles({
    errorBox: {
      marginBottom: theme.spacing.unit,
      padding: theme.spacing.unit
    }
  })
  const classes = useStyles()
  return (
    <>
      <Button
        size="small"
        className={classes.errorBox}
        variant="contained"
        onClick={() => clearError()}
      >
        Clear Errors
      </Button>
      {errorData.errorMessage.ERRORS.map(error => {
        console.log(error)
        return (
          <Paper
            style={{
              border: '1px solid',
              borderColor: theme.palette.secondary.main
            }}
            key={error}
            className={classes.errorBox}
          >
            <div dangerouslySetInnerHTML={{ __html: error }} />
          </Paper>
        )
      })}
    </>
  )
}

export default connect(
  state => ({}),
  dispatch => ({
    clearError: () => dispatch(clearError())
  })
)(Error)
