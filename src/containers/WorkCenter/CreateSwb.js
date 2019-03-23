import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import SkuPicker from './SkuPicker'
import PartPicker from './PartPicker'
import Modal from '@material-ui/core/Modal'
import ActionButton from '../../components/ActionButton'
import { connect } from 'react-redux'
import ModalPaper from '../../components/ModalPaper'
import { createSwb, clearSwbPickerSelection } from '../../actions'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'

function CreateSwb({
  clearSwbPickerSelection,
  createSwb,
  selection,
  workCenter
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [part, setPart] = useState('')
  const workCenterId = workCenter.id

  const onCreateSwb = () => {
    if (workCenter.is_mower_attributes) {
      createSwb({
        data_source: 'standard_work',
        request_type: 'create_sw_master',
        new_sw_master_arr: {
          dsswb_swb_force_skip_approval: 0,
          dsswb_swb_manage_notes: ''
        },
        work_center_id: workCenterId,
        multi_attribute_id_arr: selection
      })
    } else {
      let createObj = {
        data_source: 'standard_work',
        request_type: 'create_sw_master',
        new_sw_master_arr: {
          dsswb_swb_force_skip_approval: 0,
          dsswb_swb_manage_notes: ''
          // dsswb_swb_desc: title ? title : null
        },
        // swb_parts_arr: part ? [part] : null,
        work_center_id: workCenterId
      }
      if (part) {
        createObj = { ...createObj, swb_parts_arr: [part] }
      }
      if (title) {
        createObj = {
          ...createObj,
          new_sw_master_arr: {
            ...createObj.new_sw_master_arr,
            dsswb_swb_desc: title
          }
        }
      }
      createSwb(createObj)
    }
    setTitle('')
    setPart('')
    setOpen(false)
    clearSwbPickerSelection()
  }

  return (
    <>
      <ActionButton
        toolTip="Add SWB"
        actionFunction={() => {
          clearSwbPickerSelection()
          setOpen(true)
        }}
      />
      <Modal disableEnforceFocus open={open}>
        <ModalPaper
          title="Create Standard Work Book"
          closeFunction={() => setOpen(false)}
        >
          <Button
            size="small"
            fullWidth
            variant="outlined"
            color="primary"
            onClick={onCreateSwb}
          >
            CREATE
          </Button>
          {workCenter.is_mower_attributes ? (
            <SkuPicker workCenterId={workCenterId} />
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
              {part && <Chip label={part} />}
              <PartPicker handleAddPart={part => setPart(part)} />
            </>
          )}
        </ModalPaper>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  selection: state.selection
})

const mapDispatchToProps = dispatch => ({
  createSwb: fields => dispatch(createSwb(fields)),
  clearSwbPickerSelection: () => dispatch(clearSwbPickerSelection())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSwb)
