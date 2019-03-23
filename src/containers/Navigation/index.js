import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/styles'
import Login from '../App/Login'
import Departments from './Departments'

export default function Navigation({ handleDrawerToggle, mobileOpen }) {
  const useStyles = makeStyles(theme => ({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 200,
        flexShrink: 0
      }
    },
    // toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 200
    }
  }))

  const classes = useStyles()

  const drawer = (
    <>
      <Login />
      <Departments />
    </>
  )

  return (
    <nav className={classes.drawer}>
    {/* <div className={classes.toolbar} /> */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}
