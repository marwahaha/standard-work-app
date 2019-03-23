import React, { useState } from 'react'
import FilterIcon from '@material-ui/icons/Filter'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import ModalPaper from './ModalPaper'
import { makeStyles, useTheme } from '@material-ui/styles'
import TogglePictogram from './TogglePictogram'

function AddPictogram({ handleAddPictogram, entity, pictograms }) {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const useStyles = makeStyles({
    smallIcon: {
      fontSize: 20
    },
    paper: {
      padding: theme.spacing.unit
    }
  })

  const classes = useStyles()

  return (
    <>
      <Tooltip disableFocusListener title="Pick Pictogram">
        <IconButton onClick={() => setOpen(!open)}>
          <FilterIcon className={classes.smallIcon} />
        </IconButton>
      </Tooltip>
      <Modal open={open}>
        <ModalPaper title="Pick Pictogram" closeFunction={() => setOpen(false)}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => handleAddPictogram(null, entity.id)}
          >
            NONE
          </Button>
          <div>
            {Object.keys(pictograms).map(pictogramId => {
              const pictogram = pictograms[pictogramId]
              return (
                <TogglePictogram
                  key={pictogram.dpl_id}
                  entity={entity}
                  pictogram={pictogram}
                  handleAddPictogram={handleAddPictogram}
                />
              )
            })}
          </div>
        </ModalPaper>
      </Modal>
    </>
  )
}

export default AddPictogram
