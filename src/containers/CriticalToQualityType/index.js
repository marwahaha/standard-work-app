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
  updateCtqType,
  createCtqType,
  fetchCtqTypes,
  deleteCtqType
} from '../../actions'
import CreateTableHeader from '../../components/CreateTableHeader'
import Delete from '../../components/Delete'

function CriticalToQualityType({
  updateCtqType,
  createCtqType,
  fetchCtqTypes,
  deleteCtqType,
  ctqTypes
}) {
  const fetchData = async () => {
    document.title = 'Work Tag Types'
    await fetchCtqTypes({
      data_source: 'standard_work',
      request_type: 'get_all_ctq_type_data',
      convert_boolean_fields: 'yes',
      convert_ids_to_string: 'yes'
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDeleteCtqType = ctqTypeId => {
    deleteCtqType({
      data_source: 'standard_work',
      request_type: 'delete_ctq_type_definition',
      definition_id: ctqTypeId
    })
  }

  const handleCreateCtqType = name => {
    createCtqType({
      data_source: 'standard_work',
      request_type: 'add_ctq_type_def',
      managed_item_arr: {
        desc: name
      }
    })
  }

  const handleUpdateCtqTypeTitle = (name, ctqTypeId) => {
    updateCtqType({
      data_source: 'standard_work',
      request_type: 'update_ctq_type_def',
      managed_item_arr: {
        desc: name
      },
      def_id: ctqTypeId
    })
  }
  const handleUpdateCtqTypeActive = (active, ctqTypeId) => {
    updateCtqType({
      data_source: 'standard_work',
      request_type: 'update_ctq_type_def',
      managed_item_arr: {
        active: !active
      },
      def_id: ctqTypeId
    })
  }
  return (
    <>
      <CreateTableHeader
        title="Critical To Quality Types"
        createEntity={name => handleCreateCtqType(name)}
      />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell />
              <TableCell />
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ctqTypes &&
              Object.keys(ctqTypes).map(ctqTypeId => {
                const ctqType = ctqTypes[ctqTypeId]
                return (
                  <TableRow key={ctqTypeId}>
                    <TableCell component="th" scope="row">
                      {ctqTypes[ctqTypeId].desc}
                    </TableCell>
                    <TableCell>
                      <UpdateTitle
                        title={ctqType.desc}
                        saveTitle={name =>
                          handleUpdateCtqTypeTitle(name, ctqTypeId)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Delete
                        title="CTQ Type"
                        handleDelete={() => handleDeleteCtqType(ctqTypeId)}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        color="primary"
                        checked={ctqType.active}
                        onChange={() => {
                          handleUpdateCtqTypeActive(ctqType.active, ctqTypeId)
                        }}
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
    ctqTypes: state.ctqTypes
  }),
  dispatch => ({
    updateCtqType: fields => dispatch(updateCtqType(fields)),
    deleteCtqType: fields => dispatch(deleteCtqType(fields)),
    fetchCtqTypes: fields => dispatch(fetchCtqTypes(fields)),
    createCtqType: fields => dispatch(createCtqType(fields))
  })
)(CriticalToQualityType)
