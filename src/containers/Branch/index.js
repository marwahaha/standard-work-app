import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import ReorderIcon from '@material-ui/icons/Reorder'
import IconButton from '@material-ui/core/IconButton'
import RootRef from '@material-ui/core/RootRef'
import Tooltip from '@material-ui/core/Tooltip'
import Card from '@material-ui/core/Card'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import UpdateTitle from '../../components/UpdateTitle'
import CreateElement from './CreateElement'
import BranchOptions from './BranchOptions'
import { deleteBranch, updateBranch, toggleBranchExpand } from '../../actions'
import { connect } from 'react-redux'
import Delete from '../../components/Delete'
import { useTheme, makeStyles } from '@material-ui/styles'
import Element from '../Element'

function ElementsList({ elementIds, jesIndex }) {
  return elementIds.map((elementId, index) => (
    <Element
      key={elementId}
      elementId={elementId}
      index={index}
      jesIndex={jesIndex}
    />
  ))
}

function areEqual(prevProps, nextProps) {
  if (
    nextProps.elementIds === prevProps.elementIds &&
    nextProps.jesIndex === prevProps.jesIndex
  ) {
    return true
  }
  return false
}

const PureElementsList = React.memo(ElementsList, areEqual)

function Branch({
  branches,
  branchId,
  jess,
  elements,
  deleteBranch,
  updateBranch,
  toggleBranchExpand,
  index
}) {
  const [selectedJes, setJes] = useState(0)

  const theme = useTheme()

  const useStyles = makeStyles({
    jesRoot: {
      background: theme.palette.primary.main,
      position: 'relative',
      border: `solid 1px #fdbb2d`,
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing.unit,
      boxShadow: '0 1px 2px 1px rgb(253, 187, 45, .3)'
    },
    editJes: {
      display: 'flex',
      position: 'absolute',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      top: 0,
      right: 0
    },
    elementList: {
      display: 'flex column'
    },
    leftIcon: {
      marginRight: theme.spacing.unit / 2,
      fontSize: 20
    },
    smallIcon: {
      fontSize: 20
    },
    jesTitle: {
      cursor: 'pointer',
      userSelect: 'none',
      paddingLeft: theme.spacing.unit * 1.5,
      '&:hover': {
        color: 'black'
      }
    }
  })

  const handleSaveTitle = (title, branchId) =>
    updateBranch({
      data_source: 'standard_work',
      request_type: 'update_branch',
      branch_update_arr: {
        dsb_branch_desc: title,
        dsb_branch_manage_notes: ''
      },
      asab_id: branchId
    })

  const handleDeleteBranch = branchId =>
    deleteBranch({
      data_source: 'standard_work',
      request_type: 'delete_branch',
      asab_id: branchId
    })

  const branch = branches[branchId]

  const jessChildOfBranch = branch.jesIds.map(jesId => jess[jesId])
  const jes = jessChildOfBranch[selectedJes]
  const elementsChildOfJes = jes.elementIds.map(eleId => elements[eleId])
  const time = elementsChildOfJes.reduce(
    (acc, curr) => acc + Number(curr.time),
    0
  )
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60
  const totalJesTime =
    minutes.toString() + ':' + seconds.toString().padStart(2, '0')
  const classes = useStyles()

  return (
    <Draggable draggableId={branch.id} index={index}>
      {provided => (
        <RootRef rootRef={provided.innerRef}>
          <Card {...provided.draggableProps} className={classes.jesRoot}>
            <Typography
              inline
              variant="subtitle1"
              color={branch.expandOpen ? 'textPrimary' : 'textSecondary'}
              onClick={() => toggleBranchExpand(branch.id)}
              className={classes.jesTitle}
            >
              {`${index + 1}. ${branch.title}`}
            </Typography>
            <UpdateTitle
              title={branch.title}
              saveTitle={title => handleSaveTitle(title, branch.id)}
            />
            <div className={classes.editJes}>
              <Tooltip
                placement="left"
                title="JES ID. Copy the ID to move to other SWB"
              >
                <Typography
                  style={{ marginRight: theme.spacing.unit }}
                  variant="caption"
                >{`ID: ${branch.id}`}</Typography>
              </Tooltip>
              <Tooltip placement="left" title="Total JES Time">
                <Typography variant="body1" inline>
                  {totalJesTime}
                </Typography>
              </Tooltip>
              <CreateElement
                totalElements={elementsChildOfJes.length}
                jesId={jes.id}
              />
              <Delete
                title="Jes"
                handleDelete={() => handleDeleteBranch(branch.id)}
              />
              <div
                style={{ display: 'inline-block' }}
                {...provided.dragHandleProps}
              >
                <IconButton disabled>
                  <ReorderIcon className={classes.smallIcon} />
                </IconButton>
              </div>
            </div>
            <br />
            {branch.expandOpen && (
              <>
                {branch.attributeType && (
                  <BranchOptions
                    setJes={setJes}
                    jessChildOfBranch={jessChildOfBranch}
                    branch={branch}
                    selectedJes={selectedJes}
                  />
                )}
                <div className={classes.elementList}>
                  <Droppable droppableId={jes.id} type="element">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={classes.dropableElements}
                        style={{
                          background:
                            snapshot.isDraggingOver &&
                            theme.palette.primary.main
                        }}
                      >
                        <PureElementsList
                          jesIndex={index}
                          elementIds={jes.elementIds}
                          jesId={jes.id}
                        />
                        {provided.placeholder}
                        <Typography
                          style={{
                            paddingTop: theme.spacing.unit / 2,
                            paddingBottom: theme.spacing.unit / 2,
                            background: 'white',
                            borderBottomLeftRadius: theme.shape.borderRadius,
                            borderBottomRightRadius: theme.shape.borderRadius
                          }}
                          variant="subtitle1"
                          align="center"
                          color="textSecondary"
                        >
                          (Drop Element Here)
                        </Typography>
                      </div>
                    )}
                  </Droppable>
                </div>
              </>
            )}
          </Card>
        </RootRef>
      )}
    </Draggable>
  )
}

const mapDispatchToProps = dispatch => ({
  updateBranch: fields => dispatch(updateBranch(fields)),
  deleteBranch: fields => dispatch(deleteBranch(fields)),
  toggleBranchExpand: branchId => dispatch(toggleBranchExpand(branchId))
})

const mapStateToProps = state => ({
  jess: state.jess,
  elements: state.elements,
  deleteBranch: state.deleteBranch,
  updateBranch: state.updateBranch,
  toggleBranchExpand: state.toggleBranchExpand,
  branches: state.branches
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Branch)
