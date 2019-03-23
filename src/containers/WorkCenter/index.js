import React from 'react'
import { connect } from 'react-redux'
import CreateSwb from './CreateSwb'
import SwbPaperLink from './SwbPaperLink'

function WorkCenter({ match, workCenters }) {
  const workCenterId = match.params.workcenter
  const workCenter = workCenters[workCenterId]
  return (
    <>
      {workCenter.swbs_asam_ids.map(swbId => (
        <SwbPaperLink key={swbId} swbId={swbId} workCenter={workCenter}  />
      ))}
      {workCenter && <CreateSwb workCenter={workCenter} workCenterId={workCenterId} />}
    </>
  )
}

export default connect(
  state => ({
    workCenters: state.workCenters
  }),
  dispatch => ({})
)(WorkCenter)
