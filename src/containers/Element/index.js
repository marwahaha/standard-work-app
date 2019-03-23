import React, { useState } from 'react'
import { useTheme, makeStyles } from '@material-ui/styles'
import ReorderIcon from '@material-ui/icons/Reorder'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import UpdateTitle from '../../components/UpdateTitle'
import UpdateTime from '../../components/UpdateTime'
import Delete from '../../components/Delete'
import RootRef from '@material-ui/core/RootRef'
import SelectTools from './SelectTools'
import ImageUpload from '../ImageUpload'
import Typography from '@material-ui/core/Typography'
import AddPartToElement from './AddPartToElement'
import { formatTime } from '../../helpers/formatTime'
import SelectWorkTags from './SelectWorkTags'
import SelectHazards from './SelectHazards'
import CreateCriticalPoint from './CreateCriticalPoint'
import KeyPoints from './KeyPoints'
import Tooltip from '@material-ui/core/Tooltip'
import CreateIcon from '@material-ui/icons/Create'
import {
  updateElement,
  deleteElement,
  updateTools,
  updateElementHazard,
  updateElementWorkTag
} from '../../actions'

function Element({
  elementId,
  elements,
  index,
  deleteElement,
  updateElement,
  updateTools,
  hazards,
  updateElementHazard,
  updateElementWorkTag,
  jesIndex,
  keyPointsVisable,
  ctqsVisable,
  workTagsVisable
}) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const useStyles = makeStyles({
    main: {
      position: 'relative',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      },
      borderBottom: `solid 1px #fdbb2d`,
      backgroundColor: 'white'
    },
    editButtons: {
      position: 'absolute',
      top: -theme.spacing.unit / 2,
      right: -theme.spacing.unit / 2,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing.unit * 1.5,
      [theme.breakpoints.down('sm')]: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        position: 'relative'
      }
    },
    editImageButton: {
      position: 'absolute',
      top: 0,
      left: 0
    },
    elementImage: {
      [theme.breakpoints.up('sm')]: {
        width: 333,
        height: 250
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 'auto'
      }
    },
    updateElementImage: {
      [theme.breakpoints.up('sm')]: {
        width: 333
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 'auto'
      }
    },
    smallIcon: {
      fontSize: 20
    },
    attributes: {
      display: 'flex wrap',
      alignItems: 'center',
      borderBottom: 'solid 1px grey',
      borderColor: theme.palette.grey[200],
      paddingBottom: theme.spacing.unit / 1.5,
      marginBottom: theme.spacing.unit / 1.5
    },
    allAttributes: {
      marginLeft: theme.spacing.unit
    }
  })
  const classes = useStyles()

  const saveTitle = title => {
    updateElement({
      data_source: 'standard_work',
      request_type: 'update_element',
      element_update_arr: {
        dse_element_desc: title,
        dse_element_requires_approval: 0,
        dse_is_shared: 0,
        dse_element_value_added_time: element.time,
        dse_element_non_value_added_time: 0,
        dse_element_non_value_added_but_necessary_time: 0,
        dse_element_manage_notes: ''
      },
      ajea_id: element.id
    })
  }
  const saveTime = time => {
    updateElement({
      data_source: 'standard_work',
      request_type: 'update_element',
      element_update_arr: {
        dse_element_desc: element.title,
        dse_element_media_ama_id: null,
        dse_element_requires_approval: 0,
        dse_is_shared: 0,
        dse_element_value_added_time: time,
        dse_element_non_value_added_time: 0,
        dse_element_non_value_added_but_necessary_time: 0,
        dse_element_manage_notes: ''
      },
      ajea_id: element.id
    })
  }

  const saveTools = toolIds => {
    updateTools({
      data_source: 'standard_work',
      request_type: 'update_element_tools',
      ajea_id: element.id,
      attribute_id_arr: toolIds
    })
  }

  const saveWorkTags = workTagIds => {
    updateElementWorkTag({
      data_source: 'standard_work',
      request_type: 'update_element_work_tags',
      ajea_id: element.id,
      attribute_id_arr: workTagIds
    })
  }

  const saveHazards = toolIds => {
    updateElementHazard({
      data_source: 'standard_work',
      request_type: 'update_element_hazards',
      ajea_id: element.id,
      attribute_id_arr: toolIds
    })
  }

  const handleDeleteElement = elementId =>
    deleteElement({
      data_source: 'standard_work',
      request_type: 'delete_element',
      ajea_id: elementId
    })

  const element = elements[elementId]

  const { title, time } = element

  const formattedElementTime = formatTime(time)
  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided, snapshot) => (
        <RootRef rootRef={provided.innerRef}>
          <div className={classes.main} {...provided.draggableProps}>
            {element.media && !open && (
              <>
                <div className={classes.editImageButton}>
                  <Tooltip
                    disableFocusListener
                    title="Edit Image"
                    placement="bottom"
                  >
                    <IconButton onClick={() => setOpen(true)}>
                      <CreateIcon style={{ color: 'white', opacity: '.9' }} />
                    </IconButton>
                  </Tooltip>
                </div>
                <img
                  src={element.media.image_standard.media_src_url}
                  alt={String(element.id)}
                  className={classes.elementImage}
                />
              </>
            )}
            {element.media && open && (
              <div className={classes.updateElementImage}>
                <IconButton onClick={handleClose}>
                  <ArrowBackIcon />
                </IconButton>
                <ImageUpload element={element} />
              </div>
            )}
            {!element.media && (
              <div
                style={{ padding: theme.spacing.unit / 2 }}
                className={classes.elementImage}
              >
                <ImageUpload element={element} />
              </div>
            )}

            <div className={classes.editButtons}>
              <Typography variant="subtitle2">
                {formattedElementTime}
                <UpdateTime saveTime={saveTime} time={time} />
              </Typography>
              <Delete
                title="Element"
                handleDelete={() => handleDeleteElement(element.id)}
              />
              <Typography variant="subtitle2">
                {`${jesIndex + 1}.${index + 1}`}
              </Typography>

              <div
                style={{ display: 'inline-block' }}
                {...provided.dragHandleProps}
              >
                <IconButton disabled>
                  <ReorderIcon className={classes.smallIcon} />
                </IconButton>
              </div>
            </div>

            <div className={classes.allAttributes}>
              <Typography style={{ textOverflow: 'ellipsis' }} variant="h6">
                {title}
                <UpdateTitle saveTitle={saveTitle} title={title} />
              </Typography>
              {keyPointsVisable && (
                <div className={classes.attributes}>
                  <Typography inline variant="body1">
                    Key Points
                  </Typography>
                  <KeyPoints element={element} />
                </div>
              )}
              {ctqsVisable && (
                <div className={classes.attributes}>
                  <Typography inline variant="body1">
                    Critical To Quality
                  </Typography>
                  <CreateCriticalPoint element={element} />
                </div>
              )}
              <div className={classes.attributes}>
                <Typography inline variant="body1">
                  Parts
                </Typography>
                <AddPartToElement
                  elementId={element.id}
                  elementParts={element.parts}
                />
              </div>
              <SelectHazards
                allHazards={hazards}
                elementHazards={element.hazards}
                saveHazards={saveHazards}
              />
              <SelectTools elementTools={element.tools} saveTools={saveTools} />
              {workTagsVisable && (
                <SelectWorkTags
                  elementWorkTags={element.workTags}
                  saveWorkTags={saveWorkTags}
                />
              )}
            </div>
          </div>
        </RootRef>
      )}
    </Draggable>
  )
}

export default connect(
  state => ({
    elements: state.elements,
    hazards: state.hazards,
    keyPointsVisable: state.keyPointsVisable,
    ctqsVisable: state.ctqsVisable,
    workTagsVisable: state.workTagsVisable
  }),
  dispatch => ({
    updateElement: fields => dispatch(updateElement(fields)),
    deleteElement: fields => dispatch(deleteElement(fields)),
    updateTools: fields => dispatch(updateTools(fields)),
    updateElementWorkTag: fields => dispatch(updateElementWorkTag(fields)),
    updateElementHazard: fields => dispatch(updateElementHazard(fields))
  })
)(Element)
