import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import apiRequest from '../../helpers/apiRequest'

function PartPicker({ handleAddPart }) {
  const [partsResults, setPartsResults] = useState(null)
  const [part, setPart] = useState('')

  const theme = useTheme()
  const useStyles = makeStyles({
    smallIcon: {
      fontSize: 20
    },
    paper: {
      padding: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    },
    editButtons: {
      position: 'absolute',
      right: theme.spacing.unit
    },
    badge: {
      top: 5,
      right: 2,
      background: theme.palette.grey[100],
      border: 'solid white 2px'
    },
    partChip: {
      display: 'inline-block',
      marginRight: theme.spacing.unit / 1.5,
      marginBottom: theme.spacing.unit / 1.5,
      background: theme.palette.grey[200],
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
      paddingTop: theme.spacing.unit / 2,
      paddingBottom: theme.spacing.unit / 2,
      borderRadius: theme.shape.borderRadius,
      whiteSpace: 'nowrap'
    }
  })

  const classes = useStyles()

  const handlePartSearch = async event => {
    const partString = event.target.value
    if (partString) {
      const data = await apiRequest({
        data_source: 'standard_work',
        request_type: 'parts_data_autocomplete',
        part_search_str: partString,
        convert_boolean_fields: 'yes',
        convert_ids_to_string: 'yes'
      })
      setPartsResults(data.parts_data_autocomplete)
    }
    setPart(partString)
  }

  return (
    <>
      <TextField
        fullWidth
        autoComplete="off"
        autoFocus
        value={part}
        onChange={handlePartSearch}
        label="Search Parts"
        margin="normal"
      />

      {partsResults &&
        partsResults.map(part => (
          <Paper key={part.part} className={classes.paper}>
            <div>
              <Typography variant="subtitle1">{part.part}</Typography>
              <Typography>{part.desc}</Typography>
            </div>
            <div className={classes.editButtons}>
              {
                <Button
                  key={part}
                  size="small"
                  onClick={() => handleAddPart(part.part)}
                  variant="contained"
                  color="primary"
                >
                  Add
                  <AddIcon className={classes.smallIcon} />
                </Button>
              }
            </div>
          </Paper>
        ))}
    </>
  )
}

export default PartPicker
