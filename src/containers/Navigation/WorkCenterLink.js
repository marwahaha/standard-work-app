import React from 'react'
import { connect } from 'react-redux'
import { setWorkCenter, toggleOpenWorkCenter } from '../../actions'
import { Link as RouterLink } from 'react-router-dom'
import { useTheme } from '@material-ui/styles'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import SwbLink from './SwbLink'

function WorkCenterLink({
  workCenters,
  currentWorkCenter,
  setWorkCenter,
  workCenterId,
  toggleOpenWorkCenter,
  openWorkCenters
}) {
  const workCenter = workCenters[workCenterId]
  const isOpenWorkCenter = openWorkCenters.includes(workCenterId)
  const isCurrentWorkCenter = currentWorkCenter === workCenterId

  const theme = useTheme()
  const activeStyle = isCurrentWorkCenter
    ? { fontWeight: 'bolder', textDecoration: 'underline' }
    : null
  return (
    <>
      <Typography
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: theme.spacing.unit / 2,
          paddingLeft: theme.spacing.unit * 1.5
        }}
      >
        <Link
          underline="hover"
          component={RouterLink}
          onClick={() => setWorkCenter(workCenterId)}
          to={`/work-center/${workCenterId}`}
          style={{
            paddingLeft: theme.spacing.unit * 2,
            ...activeStyle
          }}
        >
          {workCenter.display_name}
        </Link>
        <IconButton
          style={{
            padding: theme.spacing.unit / 3,
            position: 'absolute',
            right: theme.spacing.unit / 2
          }}
          onClick={() => toggleOpenWorkCenter(workCenterId)}
        >
          {isOpenWorkCenter ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </IconButton>
      </Typography>
      {isOpenWorkCenter &&
        workCenter.swbs_asam_ids.map(swbId => (
          <SwbLink key={swbId} swbId={swbId} />
        ))}
    </>
  )
}

export default connect(
  state => ({
    workCenters: state.workCenters,
    currentWorkCenter: state.currentWorkCenter,
    openWorkCenters: state.openWorkCenters
  }),
  dispatch => ({
    setWorkCenter: workCenterId => dispatch(setWorkCenter(workCenterId)),
    toggleOpenWorkCenter: workCenterId =>
      dispatch(toggleOpenWorkCenter(workCenterId))
  })
)(WorkCenterLink)
