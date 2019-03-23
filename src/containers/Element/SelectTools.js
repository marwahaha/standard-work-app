import React from 'react'
import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import { makeStyles, useTheme } from '@material-ui/styles'
import { MultiSelect } from '../../components/MultiSelect'
import { connect } from 'react-redux'

function getStyles(elementTools, tool, theme) {
  return {
    fontWeight: elementTools.includes(tool.id)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
    color: tool.color_hex
  }
}

function SelectTools({ tools, elementTools, saveTools }) {
  const allTools = tools
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
    const saveValue = event.target.value
    saveTools(saveValue)
  }

  const classes = useStyles()
  return (
    <MultiSelect inputLabel="Tools">
      <Select
        multiple
        value={elementTools}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(toolId => {
              const tool = allTools[toolId]
              return (
                <Chip
                  key={toolId}
                  label={tool.name}
                  className={classes.chip}
                  avatar={
                    tool.pictogram_src_url && (
                      <Avatar
                        style={{
                          border: `solid black 1px`
                        }}
                        src={tool.pictogram_src_url}
                      />
                    )
                  }
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
        {Object.keys(allTools).map(toolId => {
          const tool = allTools[toolId]
          return (
            <MenuItem
              key={toolId}
              value={toolId}
              style={getStyles(elementTools, tool, theme)}
            >
              {tool.pictogram_src_url ? (
                <Avatar
                  style={{
                    marginRight: theme.spacing.unit,
                    border: 'black 1px solid'
                  }}
                  src={tool.pictogram_src_url}
                />
              ) : (
                <div
                  style={{
                    marginRight: theme.spacing.unit * 6
                  }}
                />
              )}
              {tool.name}
            </MenuItem>
          )
        })}
      </Select>
    </MultiSelect>
  )
}
export default connect(
  state => ({
    tools: state.tools
  }),
  dispatch => ({})
)(SelectTools)

// Object.keys(state.tools)
//       .map(toolId => state.tools[toolId])
//       .filter(tool => tool.active)
