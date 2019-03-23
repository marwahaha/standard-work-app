import React, { useState } from 'react'
import Popover from '@material-ui/core/Popover'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import { createJes } from '../../actions'
import { connect } from 'react-redux'
import availableJesAttribs from '../../helpers/availableJesAttribs'
import Tooltip from '@material-ui/core/Tooltip'
import { useTheme, makeStyles } from '@material-ui/styles'

function CreateJes({
  attributeCategoryId,
  attributeCategoryTypes,
  attributeValues,
  allBranchAttributes,
  selection,
  skuData,
  createJes,
  branchId
}) {
  const theme = useTheme()
  const useStyles = makeStyles({
    smallIcon: {
      fontSize: 20
    },
    paper: {
      padding: theme.spacing.unit
    },
    addVarient: {
      margin: theme.spacing.unit * 0.8,
      padding: theme.spacing.unit * 0.8
    }
  })
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedAttribs, setSelectedAttribs] = useState([])
  const open = Boolean(anchorEl)

  const handleClick = event => setAnchorEl(event.currentTarget)

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedAttribs([])
  }

  const onJesCreate = () => {
    createJes({
      data_source: 'standard_work',
      request_type: 'create_jes_and_add_to_branch',
      new_jes_arr: {},
      asab_id: branchId,
      attribute_id_arr: selectedAttribs
    })
    handleClose()
  }

  const addAttribute = attributeId =>
    setSelectedAttribs(selectedAttribs.concat(attributeId))

  const removeAttribute = attributeId =>
    setSelectedAttribs(selectedAttribs.filter(val => val !== attributeId))

  const availableBranchAttribs = availableJesAttribs(
    selection,
    skuData,
    attributeCategoryId
  )

  const intersection = (arr1, arr2) => arr1.filter(x => !arr2.includes(x))

  const filteredForSelection = intersection(
    intersection(availableBranchAttribs, allBranchAttributes.flat()),
    selectedAttribs
  )

  return (
    <>
      <Tooltip disableFocusListener placement="right" title="Create JES">
        <span>
          <Button
            disabled={filteredForSelection.length < 1}
            onClick={handleClick}
            className={classes.addVarient}
            size="small"
          >
            <AddIcon className={classes.smallIcon} />
            {attributeCategoryTypes[attributeCategoryId]}
          </Button>
        </span>
      </Tooltip>
      <Popover
        id="simple-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <div className={classes.paper}>
          {selectedAttribs.map(attributeId => (
            <React.Fragment key={attributeId}>
              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={() => removeAttribute(attributeId)}
              >
                {attributeValues[attributeCategoryId][attributeId]}
              </Button>
              <br />
            </React.Fragment>
          ))}
          {filteredForSelection.map(attributeId => (
            <React.Fragment key={attributeId}>
              <Button
                fullWidth
                size="small"
                onClick={() => addAttribute(attributeId)}
              >
                {attributeValues[attributeCategoryId][attributeId]}
              </Button>
              <br />
            </React.Fragment>
          ))}
          <Button
            disabled={!selectedAttribs.length > 0}
            size="small"
            color="primary"
            onClick={onJesCreate}
          >
            Create
          </Button>
          <Button size="small" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Popover>
    </>
  )
}

export default connect(
  state => ({
    attributeCategoryTypes: state.attributeCategoryTypes,
    attributeValues: state.attributeValues,
    selection: state.selection,
    skuData: state.skuData
  }),
  dispatch => ({
    createJes: fields => dispatch(createJes(fields))
  })
)(CreateJes)
