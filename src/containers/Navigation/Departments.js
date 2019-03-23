import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
import { setDepartment } from '../../actions'
import Line from './Line'

function Departments({ setDepartment, currentDepartment, departments }) {
  const theme = useTheme()
  return (
    <>
      <FormControl style={{ margin: theme.spacing.unit }}>
        <InputLabel>Department</InputLabel>
        <Select
          autoWidth
          value={currentDepartment}
          onChange={event => setDepartment(event.target.value)}
        >
          {Object.keys(departments).map(deptId => {
            const dept = departments[deptId]
            return (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.display_name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      {departments[currentDepartment].line_ids.map(lineId => (
        <Line key={lineId} lineId={lineId} />
      ))}
    </>
  )
}

export default connect(
  state => ({
    currentDepartment: state.currentDepartment,
    departments: state.departments
  }),
  dispatch => ({
    setDepartment: departmentId => dispatch(setDepartment(departmentId))
  })
)(Departments)
