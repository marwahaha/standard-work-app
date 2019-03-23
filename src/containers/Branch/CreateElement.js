import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { addElement } from '../../actions'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ModalPaper from '../../components/ModalPaper'
import Modal from '@material-ui/core/Modal'
import { TimeInput } from '../../components/TimeInput'
import Badge from '@material-ui/core/Badge'
import { makeStyles, useTheme } from '@material-ui/styles'

function CreateElement({ addElement, jesId, totalElements }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')

  const theme = useTheme()
  const useStyles = makeStyles({
    button: {
      marginTop: theme.spacing.unit
    },
    smallIcon: {
      fontSize: 20
    },
    badge: {
      top: 2,
      right: -2
    }
  })
  const classes = useStyles()

  const handleResetState = () => {
    setOpen(false)
    setTitle('')
    setTime(0)
  }

  const handleTitleUpdate = ({ target }) => setTitle(target.value)

  const createElement = () => {
    addElement({
      data_source: 'standard_work',
      request_type: 'create_element_and_add_to_jes',
      new_element_arr: {
        dse_element_desc: title,
        dse_element_media_ama_id: null,
        dse_element_requires_approval: 0,
        dse_is_shared: 0,
        dse_element_value_added_time: time,
        dse_element_non_value_added_time: 0,
        dse_element_non_value_added_but_necessary_time: 0,
        dse_element_manage_notes: ''
      },
      abja_id: jesId
    })
  }

  const handleClose = () => setOpen(!open)

  const handleExit = () => {
    handleClose()
    handleResetState()
  }

  return (
    <>
      <Tooltip disableFocusListener title="Add Element" placement="bottom">
        <IconButton onClick={handleClose}>
          <Badge
            classes={{ badge: classes.badge }}
            badgeContent={totalElements}
            color="primary"
          >
            <AddIcon className={classes.smallIcon} />
          </Badge>
        </IconButton>
      </Tooltip>
      <Modal open={open}>
        <ModalPaper title="Create Element" closeFunction={handleExit}>
          <TextField
            autoComplete="off"
            autoFocus
            fullWidth
            id="title"
            label="Title"
            margin="dense"
            type="text"
            value={title}
            onChange={handleTitleUpdate}
          />
          <TimeInput
            time={time}
            saveTime={updatedTime => setTime(updatedTime)}
          />
          <br />
          <Button
            className={classes.button}
            color="primary"
            disabled={title.length < 1}
            variant="contained"
            onClick={() => {
              createElement()
              handleResetState()
            }}
          >
            CREATE
          </Button>
        </ModalPaper>
      </Modal>
    </>
  )
}

export default connect(
  state => ({}),
  dispatch => ({
    addElement: fields => dispatch(addElement(fields))
  })
)(CreateElement)
