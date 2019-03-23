import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/styles'

function TitleBar({ pageTitle, handleDrawerToggle }) {
  const useStyles = makeStyles(theme => ({
    appBar: {
      marginLeft: 200,
      boxShadow: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    menuButton: {
      marginRight: 20
    }
  }))
  const classes = useStyles()
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense">
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {pageTitle.map((title, idx) => {
          return (
            <React.Fragment key={title + idx}>
              {pageTitle.length !== idx && idx !== 0 && (
                <KeyboardArrowRightIcon />
              )}
              <Typography noWrap variant="h6">
                {title}
              </Typography>
            </React.Fragment>
          )
        })}
      </Toolbar>
    </AppBar>
  )
}

export default TitleBar
