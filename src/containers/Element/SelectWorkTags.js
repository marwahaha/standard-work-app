import React from 'react'
import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import { makeStyles, useTheme } from '@material-ui/styles'
import { MultiSelect } from '../../components/MultiSelect'
import { connect } from 'react-redux'

function getStyles(elementWorkTags, workTagId, theme) {
  return {
    fontWeight: elementWorkTags.includes(workTagId)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular
  }
}

function SelectWorkTags({ allWorkTags, elementWorkTags, saveWorkTags }) {
  const theme = useTheme()
  const useStyles = makeStyles({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 500
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: theme.spacing.unit / 4
    }
  })

  function handleChange(event) {
    const saveValue = event.target.value
    saveWorkTags(saveValue)
  }

  const classes = useStyles()
  return (
    <MultiSelect inputLabel="Work Tags">
      <Select
        multiple
        value={elementWorkTags}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(workTagId => {
              return (
                <Chip
                  key={workTagId}
                  label={allWorkTags[workTagId].name}
                  className={classes.chip}
                />
              )
            })}
          </div>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 400,
              width: 'auto'
            }
          }
        }}
      >
        {Object.keys(allWorkTags).map(workTagId => {
          return (
            <MenuItem
              key={workTagId}
              value={workTagId}
              style={getStyles(elementWorkTags, workTagId, theme)}
            >
              {allWorkTags[workTagId].name}
            </MenuItem>
          )
        })}
      </Select>
    </MultiSelect>
  )
}
export default connect(
  state => ({
    allWorkTags: Object.keys(state.workTags)
      .map(workTagId => state.workTags[workTagId])
      .filter(workTag => workTag.active)
      .reduce((acc, curr) => {
        return { ...acc, [curr.id]: curr }
      }, {})
  }),
  dispatch => ({})
)(SelectWorkTags)
