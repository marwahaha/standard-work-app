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
import Delete from '../../components/Delete'
import {
  updateCtq,
  fetchCtqs,
  createCtq,
  fetchCtqTypes,
  deleteCtq
} from '../../actions'
import CreateTableHeader from '../../components/CreateTableHeader'
import SelectCriticalToQuality from './SelectCriticalToQuality'

function CriticalToQuality({
  ctqTypes,
  ctqs,
  updateCtq,
  fetchCtqs,
  createCtq,
  deleteCtq,
  fetchCtqTypes
}) {
  const fetchData = async () => {
    await fetchCtqs({
      data_source: 'standard_work',
      request_type: 'get_all_ctq_data',
      convert_boolean_fields: 'yes',
      convert_ids_to_string: 'yes'
    })
    await fetchCtqTypes({
      data_source: 'standard_work',
      request_type: 'get_all_ctq_type_data',
      convert_boolean_fields: 'yes',
      convert_ids_to_string: 'yes'
    })
  }

  useEffect(() => {
    document.title = 'Critical To Quality'

    fetchData()
  }, [])

  const handleCreateCtq = name => {
    createCtq({
      data_source: 'standard_work',
      request_type: 'add_ctq_def',
      managed_item_arr: {
        desc: name,
        type_id: 1
      }
    })
  }

  const handleCtqDelete = ctqId => {
    deleteCtq({
      data_source: 'standard_work',
      request_type: 'delete_ctq_definition',
      definition_id: ctqId
    })
  }

  const handleUpdateCtqTitle = (name, ctqId) => {
    updateCtq({
      data_source: 'standard_work',
      request_type: 'update_ctq_def',
      managed_item_arr: {
        desc: name
      },
      def_id: ctqId
    })
  }

  const handleUpdateCtqActive = (active, ctqId) => {
    updateCtq({
      data_source: 'standard_work',
      request_type: 'update_ctq_def',
      managed_item_arr: {
        active: !active
      },
      def_id: ctqId
    })
  }

  const handleUpdateCtqType = (ctqTypeId, ctqId) => {
    updateCtq({
      data_source: 'standard_work',
      request_type: 'update_ctq_def',
      managed_item_arr: {
        type_id: ctqTypeId
      },
      def_id: ctqId
    })
  }

  return (
    <>
      <CreateTableHeader
        title="Critical To Quality 📐⚖️"
        createEntity={name => handleCreateCtq(name)}
      />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell />
              <TableCell>Active</TableCell>
              <TableCell />
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ctqs &&
              ctqTypes &&
              Object.keys(ctqs).map(ctqId => {
                const ctq = ctqs[ctqId]
                return (
                  <TableRow key={ctqId}>
                    <TableCell component="th" scope="row">
                      {ctqs[ctqId].desc}
                    </TableCell>
                    <TableCell>
                      <UpdateTitle
                        title={ctq.desc}
                        saveTitle={name => handleUpdateCtqTitle(name, ctqId)}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        color="primary"
                        checked={ctq.active}
                        onChange={() => {
                          handleUpdateCtqActive(ctq.active, ctqId)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Delete
                        title="CTQ"
                        handleDelete={() => handleCtqDelete(ctqId)}
                      />
                    </TableCell>

                    <TableCell>
                      <SelectCriticalToQuality
                        ctq={ctq}
                        allCtqTypes={ctqTypes}
                        saveCtqType={ctqTypeId =>
                          handleUpdateCtqType(ctqTypeId, ctqId)
                        }
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
    ctqs: state.ctqs,
    ctqTypes: state.ctqTypes
  }),
  dispatch => ({
    updateCtq: fields => dispatch(updateCtq(fields)),
    deleteCtq: fields => dispatch(deleteCtq(fields)),
    fetchCtqs: fields => dispatch(fetchCtqs(fields)),
    fetchCtqTypes: fields => dispatch(fetchCtqTypes(fields)),
    createCtq: fields => dispatch(createCtq(fields))
  })
)(CriticalToQuality)
