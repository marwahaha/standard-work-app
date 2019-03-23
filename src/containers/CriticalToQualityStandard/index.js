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
  updateCtqStandard,
  createCtqStandard,
  fetchCtqStandards,
  deleteCtqStandard
} from '../../actions'
import CreateTableHeader from '../../components/CreateTableHeader'
import Delete from '../../components/Delete'

function CriticalToQualityStandard({
  updateCtqStandard,
  createCtqStandard,
  fetchCtqStandards,
  ctqStandards,
  deleteCtqStandard
}) {
  const fetchData = async () => {
    document.title = 'CTQ Standards'
    await fetchCtqStandards({
      data_source: 'standard_work',
      request_type: 'get_all_ctq_standard_data',
      convert_boolean_fields: 'yes',
      convert_ids_to_string: 'yes'
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDeleteCtqStandard = id => {
    deleteCtqStandard({
      data_source: 'standard_work',
      request_type: 'delete_ctq_standard_definition',
      definition_id: id
    })
  }

  const handleCreateCtqStandard = desc => {
    createCtqStandard({
      data_source: 'standard_work',
      request_type: 'add_ctq_standard_def',
      managed_item_arr: {
        desc: desc
      }
    })
  }

  const handleUpdateCtqStandardTitle = (desc, id) => {
    updateCtqStandard({
      data_source: 'standard_work',
      request_type: 'update_ctq_standard_def',
      managed_item_arr: {
        desc: desc
      },
      def_id: id
    })
  }
  const handleUpdateCtqStandardActive = (active, id) => {
    updateCtqStandard({
      data_source: 'standard_work',
      request_type: 'update_ctq_standard_def',
      managed_item_arr: {
        active: !active
      },
      def_id: id
    })
  }
  return (
    <>
      <CreateTableHeader
        title="Critical To Quality Standards"
        createEntity={name => handleCreateCtqStandard(name)}
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
            {ctqStandards &&
              Object.keys(ctqStandards).map(id => {
                const ctqStandard = ctqStandards[id]
                return (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {ctqStandards[id].desc}
                    </TableCell>
                    <TableCell>
                      <UpdateTitle
                        title={ctqStandard.desc}
                        saveTitle={desc =>
                          handleUpdateCtqStandardTitle(desc, id)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        color="primary"
                        checked={ctqStandard.active}
                        onChange={() => {
                          handleUpdateCtqStandardActive(ctqStandard.active, id)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Delete
                        title="CTQ Standard"
                        handleDelete={() => handleDeleteCtqStandard(id)}
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
    ctqStandards: state.ctqStandards
  }),
  dispatch => ({
    updateCtqStandard: fields => dispatch(updateCtqStandard(fields)),
    deleteCtqStandard: fields => dispatch(deleteCtqStandard(fields)),
    fetchCtqStandards: fields => dispatch(fetchCtqStandards(fields)),
    createCtqStandard: fields => dispatch(createCtqStandard(fields))
  })
)(CriticalToQualityStandard)
