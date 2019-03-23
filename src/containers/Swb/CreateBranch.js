import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import ModalPaper from '../../components/ModalPaper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createBranch, fetchSkus } from '../../actions'
import { connect } from 'react-redux'
import availableJesAttribs from '../../helpers/availableJesAttribs'
import { useTheme, makeStyles } from '@material-ui/styles'

function CreateBranch({
  open,
  handleClose,
  createBranch,
  swbId,
  selection,
  skuData,
  attributeCategoryTypes,
  attributeValues
}) {
  const [title, setTitle] = useState('')
  const [branchAttributeSelection, setBranchAttributeSelection] = useState([])
  const [attributeType, setAttributeType] = useState('')

  const handleTitleChange = ({ target }) => setTitle(target.value)

  const handleAttributeTypeChange = ({ target }) => {
    setAttributeType(target.value)
    setBranchAttributeSelection([])
  }

  const handleChange = event => setBranchAttributeSelection(event.target.value)

  const theme = useTheme()

  const useStyles = makeStyles({
    formControl: {
      marginBottom: theme.spacing.unit
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: theme.spacing.unit / 4
    },
    progress: {
      margin: theme.spacing.unit * 2
    }
  })

  const classes = useStyles()

  return (
    <Modal open={open}>
      <ModalPaper title="Create Job Element Sheet" closeFunction={handleClose}>
        <FormControl fullWidth className={classes.formControl}>
          <TextField
            autoComplete="off"
            autoFocus
            value={title}
            onChange={handleTitleChange}
            label="Title"
            margin="normal"
          />
        </FormControl>
        {!skuData && <CircularProgress className={classes.progress} />}
        {skuData && (
          <form autoComplete="off">
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="age-simple">
                Attribute Type (Optional)
              </InputLabel>
              <Select
                value={attributeType}
                onChange={handleAttributeTypeChange}
                inputProps={{
                  name: 'Attribute Type',
                  id: 'age-simple'
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.keys(attributeCategoryTypes).map(atribTypeId => (
                  <MenuItem key={atribTypeId} value={atribTypeId}>
                    {attributeCategoryTypes[atribTypeId]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            {attributeType !== '' && (
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">
                  Attribute
                </InputLabel>
                <Select
                  multiple
                  value={branchAttributeSelection}
                  onChange={handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(attributeId => (
                        <Chip
                          key={attributeId}
                          label={attributeValues[attributeType][attributeId]}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 400,
                        width: 250
                      }
                    }
                  }}
                >
                  {availableJesAttribs(selection, skuData, attributeType).map(
                    attributeId => (
                      <MenuItem
                        key={attributeId}
                        value={attributeId}
                        style={
                          branchAttributeSelection.includes(attributeId)
                            ? { fontWeight: 'bolder' }
                            : {}
                        }
                      >
                        {attributeValues[attributeType][attributeId]}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            )}
          </form>
        )}
        <br />
        <Button
          disabled={
            !(
              (attributeType.length > 0 &&
                branchAttributeSelection.length > 0 &&
                title.length > 0) ||
              (attributeType.length === 0 &&
                branchAttributeSelection.length === 0 &&
                title.length > 0)
            )
          }
          onClick={() => {
            createBranch({
              data_source: 'standard_work',
              request_type: 'create_branch_and_add_to_swb',
              new_branch_arr: {
                dsb_branch_desc: title,
                dsb_attribute_type_dswaa_id: attributeType
              },
              asam_id: swbId,
              attribute_id_arr: branchAttributeSelection
            })
            setTitle('')
            setBranchAttributeSelection([])
            setAttributeType('')

            handleClose()
          }}
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </ModalPaper>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  createBranch: fields => dispatch(createBranch(fields)),
  fetchSkus: fields => dispatch(fetchSkus(fields))
})

const mapStateToProps = state => ({
  selection: state.selection,
  skuData: state.skuData,
  attributeCategoryTypes: state.attributeCategoryTypes,
  attributeValues: state.attributeValues
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBranch)
