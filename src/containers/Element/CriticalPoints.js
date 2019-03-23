import React from 'react'
import Chip from '@material-ui/core/Chip'
import { useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
import { v4 } from 'uuid'
import { createCriticalPoint } from '../../actions'
import Avatar from '@material-ui/core/Avatar'
import Delete from '../../components/Delete'

function CriticalPoints({ element, createCriticalPoint }) {
  const theme = useTheme()

  const handleCriticalPointDelete = criticalPoint => {
    createCriticalPoint({
      data_source: 'standard_work',
      request_type: 'update_element_critical_points',
      ajea_id: element.id,
      crit_point_arr: element.criticalPoints.filter(
        val => val !== criticalPoint
      )
    })
  }

  return element.criticalPoints.map(criticalPoint => (
    <Chip
      key={v4()}
      style={{
        marginRight: theme.spacing.unit,
        background: criticalPoint.color_hex,
        color: 'white',
        fontWeight: 'bolder'
      }}
      avatar={
        criticalPoint.pictogram_src_url && (
          <Avatar src={criticalPoint.pictogram_src_url} />
        )
      }
      deleteIcon={
        <Delete
          handleDelete={() => handleCriticalPointDelete(criticalPoint)}
          title="Critical Point"
        />
      }
      label={criticalPoint.desc}
      onDelete={() => {}}
      variant="outlined"
    />
  ))
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  createCriticalPoint: fields => dispatch(createCriticalPoint(fields))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CriticalPoints)
