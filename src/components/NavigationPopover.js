import React, { useState } from 'react'
import { useTheme } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export default function NavigationPopover({ children, userName }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Button
        size="small"
        aria-owns={open ? 'simple-popper' : undefined}
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        style={{ borderRadius: 0, justifyContent: 'flex-start' }}
        color="primary"
      >
        <AccountCircleIcon style={{ marginRight: theme.spacing.unit }} />
        {userName}
      </Button>
      <Popover
        id="simple-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {children}
      </Popover>
    </>
  )
}
