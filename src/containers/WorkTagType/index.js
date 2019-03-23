import React, { useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import { connect } from 'react-redux'
import UpdateTitle from '../../components/UpdateTitle'
import {
  updateWorkTagType,
  createWorkTagType,
  fetchWorkTagTypes,
  deleteWorkTagType
} from '../../actions'
import CreateTableHeader from '../../components/CreateTableHeader'
import Delete from '../../components/Delete'

function WorkTagType({
  updateWorkTagType,
  fetchWorkTagTypes,
  createWorkTagType,
  workTagTypes,
  deleteWorkTagType
}) {
  const fetchData = async () => {
    document.title = 'Work Tag Types'

    await fetchWorkTagTypes({
      data_source: 'standard_work',
      request_type: 'get_all_work_tag_type_data',
      convert_boolean_fields: 'yes',
      convert_ids_to_string: 'yes'
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDeleteWorkTagType = id => {
    deleteWorkTagType({
      data_source: 'standard_work',
      request_type: 'delete_work_tag_type_definition',
      definition_id: id
    })
  }

  const handleCreateWorkTagType = name => {
    createWorkTagType({
      data_source: 'standard_work',
      request_type: 'add_work_tag_type_def',
      managed_item_arr: {
        name: name
      }
    })
  }

  const handleUpdateWorkTagTypeTitle = (name, workTagId) => {
    updateWorkTagType({
      data_source: 'standard_work',
      request_type: 'update_work_tag_type_def',
      managed_item_arr: {
        name: name
      },
      def_id: workTagId
    })
  }
  const handleUpdateWorkTagActive = (active, workTagId) => {
    updateWorkTagType({
      data_source: 'standard_work',
      request_type: 'update_work_tag_type_def',
      managed_item_arr: {
        active: !active
      },
      def_id: workTagId
    })
  }
  return (
    <>
      <CreateTableHeader
        title="Work Tag Types"
        createEntity={name => handleCreateWorkTagType(name)}
      />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell />
              <TableCell>Active</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {workTagTypes &&
              Object.keys(workTagTypes).map(id => {
                const workTagType = workTagTypes[id]
                return (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {workTagTypes[id].name}
                    </TableCell>
                    <TableCell>
                      <UpdateTitle
                        title={workTagType.name}
                        saveTitle={name =>
                          handleUpdateWorkTagTypeTitle(name, id)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        color="primary"
                        checked={workTagType.active}
                        onChange={() => {
                          handleUpdateWorkTagActive(workTagType.active, id)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Delete
                        title="Work Tag Type"
                        handleDelete={() => handleDeleteWorkTagType(id)}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}

export default connect(
  state => ({
    workTagTypes: state.workTagTypes
  }),
  dispatch => ({
    updateWorkTagType: fields => dispatch(updateWorkTagType(fields)),
    deleteWorkTagType: fields => dispatch(deleteWorkTagType(fields)),
    fetchWorkTagTypes: fields => dispatch(fetchWorkTagTypes(fields)),
    createWorkTagType: fields => dispatch(createWorkTagType(fields))
  })
)(WorkTagType)
