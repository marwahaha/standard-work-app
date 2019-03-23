import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { connect } from 'react-redux'

function ElementVisabilityFilters({
  dispatch,
  keyPointsVisable,
  ctqsVisable,
  workTagsVisable
}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-label="More"
        aria-owns={open ? 'long-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          selected={keyPointsVisable}
          onClick={() =>
            dispatch({
              type: 'TOGGLE_KEY_POINTS_VISABLE'
            })
          }
        >
          Key Points
        </MenuItem>
        <MenuItem
          selected={ctqsVisable}
          onClick={() =>
            dispatch({
              type: 'TOGGLE_CRITICAL_TO_QUALITY_VISABLE'
            })
          }
        >
          CTQs
        </MenuItem>
        <MenuItem
          selected={workTagsVisable}
          onClick={() =>
            dispatch({
              type: 'TOGGLE_WORK_TAGS_VISABLE'
            })
          }
        >
          Work Tags
        </MenuItem>
      </Menu>
    </>
  )
}
export default connect(state => ({
  keyPointsVisable: state.keyPointsVisable,
  ctqsVisable: state.ctqsVisable,
  workTagsVisable: state.workTagsVisable
}))(ElementVisabilityFilters)
