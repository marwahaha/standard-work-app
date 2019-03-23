import React from 'react'
import CreateJes from './CreateJes'
import { connect } from 'react-redux'
import Delete from '../../components/Delete'
import Button from '@material-ui/core/Button'
import { deleteJes } from '../../actions'
import { useTheme } from '@material-ui/styles'

function BranchOptions({
  attributeValues,
  jessChildOfBranch,
  setJes,
  branch,
  selectedJes,
  deleteJes
}) {
  const handleJesDelete = jesId => {
    deleteJes({
      data_source: 'standard_work',
      request_type: 'delete_jes',
      abja_id: jesId
    })
    setJes(0)
  }
  const theme = useTheme()
  return (
    <>
      {jessChildOfBranch.map(({ attributes, id }, idx) => {
        const displayValues = attributes.map(
          attribId => attributeValues[branch.attributeType][attribId]
        )
        const isSelected = selectedJes === idx
        return (
          <React.Fragment key={id}>
            <Button
              size="small"
              onClick={() => setJes(idx)}
              style={{ marginLeft: theme.spacing.unit / 2 }}
              variant="contained"
              color={isSelected ? 'default' : 'primary'}
              key={displayValues}
            >
              {displayValues.join(' + ')}
            </Button>
            {isSelected && jessChildOfBranch.length > 1 && (
              <Delete
                title={displayValues.join(' + ')}
                handleDelete={() => handleJesDelete(id)}
              />
            )}
          </React.Fragment>
        )
      })}
      <CreateJes
        key={branch.id}
        attributeCategoryId={branch.attributeType}
        branchId={branch.id}
        allBranchAttributes={jessChildOfBranch.map(
          ({ attributes }) => attributes
        )}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  deleteJes: fields => dispatch(deleteJes(fields))
})
const mapStateToProps = state => ({
  attributeValues: state.attributeValues
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BranchOptions)
