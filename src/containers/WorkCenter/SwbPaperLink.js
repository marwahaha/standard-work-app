import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  deleteSwb,
  updateSwb,
  initializeSwbPickerSelection
} from '../../actions'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { makeAttributeArray } from '../../helpers/makeAttributeArray'
import CreateIcon from '@material-ui/icons/Create'
import ModalPaper from '../../components/ModalPaper'
import SkuPicker from './SkuPicker'
import Delete from '../../components/Delete'
import { v4 } from 'uuid'
import TextField from '@material-ui/core/TextField'
import PartPicker from './PartPicker'

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing.unit,
    padding: theme.spacing.unit,
    position: 'relative'
  },
  chip: {
    marginTop: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    cursor: 'pointer'
  },
  editButtons: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      right: theme.spacing.unit,
      top: 2
    }
  }
}))

function SwbPaperLink({
  swbId,
  selection,
  deleteSwb,
  updateSwb,
  attributeValues,
  initializeSwbPickerSelection,
  swbs,
  workCenter
}) {
  const workCenterId = workCenter.id
  const swb = swbs[swbId]

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(swb.description)
  const [part, setPart] = useState(swb.parts ? swb.parts[0] : '')

  const onUpdateSwb = () => {
    if (workCenter.is_mower_attributes) {
      updateSwb({
        data_source: 'standard_work',
        request_type: 'update_swb',
        swb_update_arr: {
          dsswb_swb_manage_notes: 'Test 5'
        },
        asam_id: swbId,
        multi_attribute_id_arr: selection
      })
    } else {
      let updateObj = {
        data_source: 'standard_work',
        request_type: 'update_swb',
        swb_update_arr: {
          dsswb_swb_manage_notes: 'Test 5'
        },
        asam_id: swbId
      }
      if (part) {
        updateObj = { ...updateObj, swb_parts_arr: [part] }
      } else {
        updateObj = { ...updateObj, swb_parts_arr: [] }
      }
      if (title) {
        updateObj = {
          ...updateObj,
          swb_update_arr: {
            ...updateObj.swb_update_arr,
            dsswb_swb_desc: title
          }
        }
      }
      updateSwb(updateObj)
    }
    setTitle('')
    setPart('')
    setOpen(false)
  }

  const onDeleteSwb = () => {
    deleteSwb({
      data_source: 'standard_work',
      request_type: 'delete_sw_assc_hier_data',
      asam_id: swbId,
      delete_orphaned_sw_def: 'yes'
    })
  }

  const attributes = swbs[swbId].mower_attributes
  const attribsArray = makeAttributeArray(swbs[swbId], attributeValues)
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      {attribsArray.map(attrib => (
        <Chip
          key={v4()}
          component={Link}
          to={`${process.env.PUBLIC_URL}/swb/${swbId}`}
          className={classes.chip}
          label={attrib}
        />
      ))}
      <div className={classes.editButtons}>
        <Delete handleDelete={() => onDeleteSwb(swbId)} />
        <IconButton
          onClick={() => {
            if (attributes) {
              initializeSwbPickerSelection(attributes)
            } else {
              setTitle(swb.description)
              setPart(swb.parts ? swb.parts[0] : '')
            }
            setOpen(true)
          }}
        >
          <CreateIcon />
        </IconButton>
      </div>

      <Modal open={open}>
        <ModalPaper
          closeFunction={() => setOpen(false)}
          title="Edit Standard Work Book"
        >
          <Button
            fullWidth
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => onUpdateSwb(swbId)}
          >
            SAVE
          </Button>
          {workCenter.is_mower_attributes ? (
            <SkuPicker workCenterId={workCenterId} swbId={swbId} />
          ) : (
            <>
              <TextField
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <br />
              {part && <Chip onDelete={() => setPart('')} label={part} />}
              <PartPicker handleAddPart={part => setPart(part)} />
            </>
          )}
        </ModalPaper>
      </Modal>
    </Paper>
  )
}

export default connect(
  state => ({
    swbs: state.swbs,
    attributeValues: state.attributeValues,
    selection: state.selection
  }),
  dispatch => ({
    updateSwb: fields => dispatch(updateSwb(fields)),
    initializeSwbPickerSelection: fields =>
      dispatch(initializeSwbPickerSelection(fields)),
    deleteSwb: fields => dispatch(deleteSwb(fields))
  })
)(SwbPaperLink)
