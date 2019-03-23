import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { createCriticalPoint } from '../../actions'
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import ModalPaper from '../../components/ModalPaper'
import { MultiSelect } from '../../components/MultiSelect'
import Delete from '../../components/Delete'

function CreateCriticalPoint({
  element,
  createCriticalPoint,
  allCtqs,
  allCtqTypeRelations,
  allCtqTypes
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [ctqId, setCtqId] = useState('')
  const [ctqType, setCtqType] = useState('')

  const resetState = () => {
    setOpen(false)
    setTitle('')
    setCtqId('')
    setCtqType('')
  }

  const theme = useTheme()

  const useStyles = makeStyles({
    smallIcon: {
      fontSize: 20
    },
    ctqStyle: {
      display: 'inline-block',
      marginBottom: theme.spacing.unit / 2,
      padding: theme.spacing.unit / 2,
      borderRadius: theme.shape.borderRadius,
      whiteSpace: 'nowrap'
    }
  })
  const handleCreateCriticalPoint = () => {
    const request = {
      data_source: 'standard_work',
      request_type: 'update_element_critical_points',
      ajea_id: element.id,
      crit_point_arr: title
        ? element.ctqFreeform.concat({
            desc: title
          })
        : element.ctqFreeform,
      ctq_def_arr: ctqId ? [...element.ctqIds, ctqId] : element.ctqIds
    }
    createCriticalPoint(request)
    resetState()
  }

  const handleDeleteCriticalPointFreeForm = ctqToDelete => {
    const request = {
      data_source: 'standard_work',
      request_type: 'update_element_critical_points',
      ajea_id: element.id,
      crit_point_arr: element.ctqFreeform.filter(
        ({ desc }) => desc !== ctqToDelete.desc
      ),
      ctq_def_arr: element.ctqIds
    }
    createCriticalPoint(request)
    resetState()
  }

  const handleDeleteCriticalPointDefined = ctqToDeleteId => {
    const request = {
      data_source: 'standard_work',
      request_type: 'update_element_critical_points',
      ajea_id: element.id,
      crit_point_arr: element.ctqFreeform,
      ctq_def_arr: element.ctqIds.filter(id => id !== ctqToDeleteId)
    }
    createCriticalPoint(request)
    resetState()
  }

  const handleSetType = event => {
    setCtqType(event.target.value)
  }

  const handelSetCtq = event => {
    setCtqId(event.target.value)
  }

  const classes = useStyles()

  const handleTitleChange = event => setTitle(event.target.value)

  return (
    <>
      <Tooltip disableFocusListener title="Create Critical Point">
        <IconButton onClick={() => setOpen(true)} size="small">
          <AddIcon className={classes.smallIcon} />
        </IconButton>
      </Tooltip>

      {element.ctqFreeform.map((ctqFreeForm, idx) => (
        <React.Fragment key={ctqFreeForm.desc + idx}>
          <Typography
            style={{ border: 'dashed 2px green' }}
            className={classes.ctqStyle}
          >
            {ctqFreeForm.desc}
          </Typography>
          <Delete
            title="Critical To Quality"
            handleDelete={() => handleDeleteCriticalPointFreeForm(ctqFreeForm)}
          />
        </React.Fragment>
      ))}
      {element.ctqIds.map(ctqId => (
        <React.Fragment key={ctqId}>
          <Typography
            style={{
              background: 'green',
              color: 'white',
              border: 'solid 2px green'
            }}
            className={classes.ctqStyle}
          >
            {allCtqs[ctqId].desc}
          </Typography>
          <Delete
            title="Quality Standard"
            handleDelete={() => handleDeleteCriticalPointDefined(ctqId)}
          />
        </React.Fragment>
      ))}
      <Modal open={open}>
        <ModalPaper
          title="Create Critical To Quality"
          closeFunction={resetState}
        >
          <TextField
            fullWidth
            autoComplete="off"
            autoFocus
            value={title}
            onChange={handleTitleChange}
            label="Free-form Quality Point"
            margin="normal"
          />

          <Typography style={{ margin: '.5rem' }} align="center" variant="h5">
            OR
          </Typography>

          <MultiSelect inputLabel="CTQ Type">
            <Select
              value={ctqType}
              onChange={handleSetType}
              inputProps={{
                name: 'age',
                id: 'age-simple'
              }}
            >
              {Object.keys(allCtqTypes).map(id => (
                <MenuItem key={id} value={id}>
                  {allCtqTypes[id].desc}
                </MenuItem>
              ))}
            </Select>
          </MultiSelect>
          {ctqType && allCtqTypeRelations[ctqType] && (
            <MultiSelect inputLabel="CTQ">
              <Select
                value={ctqId}
                onChange={handelSetCtq}
                inputProps={{
                  name: 'age',
                  id: 'age-simple'
                }}
              >
                {allCtqTypeRelations[ctqType].map(id => {
                  return (
                    <Button
                      disabled={element.ctqIds.includes(id)}
                      key={id}
                      value={id}
                      style={{
                        display: 'block',
                        margin: theme.spacing.unit / 2
                      }}
                    >
                      {allCtqs[id].desc}
                    </Button>
                  )
                })}
              </Select>
            </MultiSelect>
          )}
          <br />
          <Button
            fullWidth
            style={{ marginTop: theme.spacing.unit }}
            size="small"
            color="primary"
            variant="contained"
            disabled={!(title || (ctqId.length > 0 && ctqType.length > 0))}
            onClick={handleCreateCriticalPoint}
          >
            Create
          </Button>
        </ModalPaper>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  allCtqs: state.allCtqs,
  allCtqTypeRelations: state.allCtqTypeRelations,
  allCtqTypes: state.allCtqTypes
})

const mapDispatchToProps = dispatch => ({
  createCriticalPoint: fields => dispatch(createCriticalPoint(fields))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCriticalPoint)
