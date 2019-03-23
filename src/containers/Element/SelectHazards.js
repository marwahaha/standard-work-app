import React from 'react'
import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, useTheme } from '@material-ui/styles'
import { MultiSelect } from '../../components/MultiSelect'

function getStyles(elementHazards, hazard, theme) {
  return {
    fontWeight: elementHazards.includes(hazard)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
    color: hazard.color_hex
  }
}

export default function SelectHazards({
  allHazards,
  elementHazards,
  saveHazards
}) {
  const theme = useTheme()
  const useStyles = makeStyles({
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: theme.spacing.unit / 4
    }
  })

  function handleChange(event) {
    saveHazards(event.target.value)
  }

  const classes = useStyles()

  return (
    <MultiSelect inputLabel="Safety">
      <Select
        multiple
        value={elementHazards}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(hazardId => (
              <Chip
                avatar={
                  <Avatar
                    style={{
                      border: 'black 1px solid'
                    }}
                    src={allHazards[hazardId].pictogram_src_url}
                  />
                }
                style={getStyles(elementHazards, allHazards[hazardId], theme)}
                variant="outlined"
                key={hazardId}
                label={allHazards[hazardId].desc}
                className={classes.chip}
              />
            ))}
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
        {Object.keys(allHazards).map(hazardId => {
          const hazard = allHazards[hazardId]
          return (
            <MenuItem
              key={hazardId}
              value={hazardId}
              style={getStyles(elementHazards, hazard, theme)}
            >
              <Avatar
                src={hazard.pictogram_src_url}
                style={{
                  border: 'black 1px solid',
                  marginRight: theme.spacing.unit / 2
                }}
              />
              {hazard.desc}
            </MenuItem>
          )
        })}
      </Select>
    </MultiSelect>
  )
}
