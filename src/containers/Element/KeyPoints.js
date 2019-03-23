import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { createKeyPoint } from '../../actions'
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import ModalPaper from '../../components/ModalPaper'
import Delete from '../../components/Delete'
import UpdateTitle from '../../components/UpdateTitle'
import { v4 } from 'uuid'

function KeyPoints({ element, createKeyPoint }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  const resetState = () => {
    setOpen(false)
  }

  const theme = useTheme()

  const useStyles = makeStyles({
    smallIcon: {
      fontSize: 20
    }
  })
  const handleCreateKeyPoint = () => {
    createKeyPoint({
      data_source: 'standard_work',
      request_type: 'update_element_key_points',
      ajea_id: element.id,
      key_point_arr: [...element.keyPoints, { desc: title }]
    })
    setTitle('')
    setOpen(false)
  }
  const handleDeleteKeyPoint = keyPoint => {
    createKeyPoint({
      data_source: 'standard_work',
      request_type: 'update_element_key_points',
      ajea_id: element.id,
      key_point_arr: element.keyPoints.filter(
        ({ desc }) => desc !== keyPoint.desc
      )
    })
  }

  const handleUpdatePoint = (updateText, updateIndex) => {
    createKeyPoint({
      data_source: 'standard_work',
      request_type: 'update_element_key_points',
      ajea_id: element.id,
      key_point_arr: element.keyPoints.map((keyPoint, idx) =>
        updateIndex === idx ? { desc: updateText } : { desc: keyPoint }
      )
    })
  }

  const classes = useStyles()

  const handleTitleChange = event => setTitle(event.target.value)
  return (
    <>
      <Tooltip disableFocusListener title="Create Key Point">
        <IconButton onClick={() => setOpen(true)} size="small">
          <AddIcon className={classes.smallIcon} />
        </IconButton>
      </Tooltip>
      {element.keyPoints.map((keyPoint, idx) => (
        <Typography
          key={v4()}
          style={{
            background: theme.palette.grey[200],
            padding: theme.spacing.unit,
            marginLeft: theme.spacing.unit / 2,
            borderRadius: theme.shape.borderRadius
          }}
          inline
        >
          {keyPoint.desc}
          <UpdateTitle
            title={keyPoint.desc}
            saveTitle={newTitle => handleUpdatePoint(newTitle, idx)}
          />
          <Delete
            title="Key Point"
            handleDelete={() => handleDeleteKeyPoint(keyPoint)}
          />
        </Typography>
      ))}
      <Modal open={open}>
        <ModalPaper title="Create Key Point" closeFunction={resetState}>
          <TextField
            fullWidth
            multiline
            autoComplete="off"
            autoFocus
            value={title}
            onChange={handleTitleChange}
            label="Title"
            margin="normal"
          />
          <Button
            fullWidth
            style={{ marginTop: theme.spacing.unit }}
            size="small"
            color="primary"
            variant="contained"
            disabled={!title}
            onClick={handleCreateKeyPoint}
          >
            CREATE
          </Button>
        </ModalPaper>
      </Modal>
    </>
  )
}
const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  createKeyPoint: fields => dispatch(createKeyPoint(fields))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyPoints)
