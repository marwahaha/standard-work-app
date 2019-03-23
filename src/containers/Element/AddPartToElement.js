import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { addPartToElement } from '../../actions'
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ModalPaper from '../../components/ModalPaper'
import Delete from '../../components/Delete'
import apiRequest from '../../helpers/apiRequest'
import { v4 } from 'uuid'

function AddPart({ elementParts, elementId, addPartToElement }) {
  const [open, setOpen] = useState(false)
  const [part, setPart] = useState('')
  const [partsResults, setPartsResults] = useState(null)

  const resetState = () => {
    setOpen(false)
    setPart('')
    setPartsResults(null)
  }

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
  const handleCreatePart = part => {
    addPartToElement({
      data_source: 'standard_work',
      request_type: 'update_element_parts',
      ajea_id: elementId,
      parts_used_arr: [
        {
          part: part.part,
          qty: 1,
          display_in_viewer: 0
        },
        ...elementParts
      ]
    })
  }

  const handleUpdatePartQuantity = (partToChange, qtyChange) => {
    const otherParts = elementParts.filter(
      part => part.part !== partToChange.part
    )
    addPartToElement({
      data_source: 'standard_work',
      request_type: 'update_element_parts',
      ajea_id: elementId,
      parts_used_arr: [
        {
          part: partToChange.part,
          qty: partToChange.qty + qtyChange,
          display_in_viewer: 0
        },
        ...otherParts
      ]
    })
  }

  const handleDeletePart = partToDelete => {
    addPartToElement({
      data_source: 'standard_work',
      request_type: 'update_element_parts',
      ajea_id: elementId,
      parts_used_arr: elementParts.filter(
        part => part.part !== partToDelete.part
      )
    })
  }

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
      <Tooltip disableFocusListener title="Add Part">
        <IconButton onClick={() => setOpen(true)}>
          <AddIcon className={classes.smallIcon} />
        </IconButton>
      </Tooltip>
      {elementParts.map(part => (
        <Typography key={part.part} className={classes.partChip}>
          {part.part} <small>({part.qty})</small>
        </Typography>
      ))}
      <Modal open={open}>
        <ModalPaper title="Add Part" closeFunction={resetState}>
          <TextField
            fullWidth
            autoComplete="off"
            autoFocus
            value={part}
            onChange={handlePartSearch}
            label="Search Parts"
            margin="normal"
          />
          {elementParts
            .sort((a, b) => a.part - b.part)
            .map(part => (
              <Paper
                key={v4()}
                style={{
                  background: theme.palette.primary.main
                }}
                className={classes.paper}
              >
                <div>
                  <Typography variant="subtitle1">{part.part}</Typography>
                  <Typography>{part.desc}</Typography>
                </div>
                <div className={classes.editButtons}>
                  <IconButton
                    disableRipple
                    onClick={() => handleUpdatePartQuantity(part, 1)}
                  >
                    <ArrowDropUpIcon className={classes.smallIcon} />
                  </IconButton>
                  <Typography inline variant="h6">
                    {part.qty}
                  </Typography>
                  <IconButton
                    disableRipple
                    onClick={() => {
                      if (part.qty > 1) handleUpdatePartQuantity(part, -1)
                    }}
                  >
                    <ArrowDropDownIcon className={classes.smallIcon} />
                  </IconButton>
                  <Delete
                    handleDelete={() => handleDeletePart(part)}
                    title="Part"
                  />
                </div>
              </Paper>
            ))}

          {partsResults &&
            partsResults.map(part => (
              <Paper key={part.part} className={classes.paper}>
                <div>
                  <Typography variant="subtitle1">{part.part}</Typography>
                  <Typography>{part.desc}</Typography>
                </div>
                <div className={classes.editButtons}>
                  {elementParts.map(part => part.part).includes(part.part) ? (
                    <Button
                      disabled
                      key={part}
                      size="small"
                      variant="contained"
                    >
                      Part Added
                    </Button>
                  ) : (
                    <Button
                      key={part}
                      size="small"
                      onClick={() => handleCreatePart(part)}
                      variant="contained"
                      color="primary"
                    >
                      Add
                      <AddIcon className={classes.smallIcon} />
                    </Button>
                  )}
                </div>
              </Paper>
            ))}
        </ModalPaper>
      </Modal>
    </>
  )
}

export default connect(
  state => ({}),
  dispatch => ({
    addPartToElement: fields => dispatch(addPartToElement(fields))
  })
)(AddPart)
