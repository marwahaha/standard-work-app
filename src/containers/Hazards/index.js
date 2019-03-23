import React, { useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import { connect } from 'react-redux'
import UpdateTitle from '../../components/UpdateTitle'
import {
  updateHazard,
  fetchHazards,
  createHazard,
  fetchPictograms,
  deleteHazard
} from '../../actions'
import AddPictogram from '../../components/AddPictogram'
import CreateTableHeader from '../../components/CreateTableHeader'
import Delete from '../../components/Delete'

function HazardsManage({
  hazards,
  updateHazard,
  fetchHazards,
  createHazard,
  pictograms,
  fetchPictograms,
  deleteHazard
}) {
  const fetchData = async () => {
    document.title = 'Hazards'
    await fetchHazards({
      data_source: 'standard_work',
      request_type: 'get_all_hazard_data',
      convert_boolean_fields: 'yes',
      convert_ids_to_string: 'yes'
    })
    await fetchPictograms({
      data_source: 'standard_work',
      request_type: 'pictogram_library_definition_data',
      get_active_records: 'yes'
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleHazardDelete = hazardId => {
    deleteHazard({
      data_source: 'standard_work',
      request_type: 'delete_hazard_definition',
      definition_id: hazardId
    })
  }

  const handleCreateHazard = desc => {
    createHazard({
      data_source: 'standard_work',
      request_type: 'add_hazard_def',
      managed_item_arr: {
        desc: desc
      }
    })
  }

  const handleUpdateHazardTitle = (desc, hazardId) => {
    updateHazard({
      data_source: 'standard_work',
      request_type: 'update_hazard_def',
      managed_item_arr: {
        desc: desc
      },
      def_id: hazardId
    })
  }
  const handleUpdateHazardActive = (active, hazardId) => {
    updateHazard({
      data_source: 'standard_work',
      request_type: 'update_hazard_def',
      managed_item_arr: {
        active: !active
      },
      def_id: hazardId
    })
  }
  const handleAddPictogram = (pictogramId, hazardId) => {
    updateHazard({
      data_source: 'standard_work',
      request_type: 'update_hazard_def',
      managed_item_arr: {
        pictogram_id: pictogramId
      },
      def_id: hazardId
    })
  }
  return (
    <>
      <CreateTableHeader
        title="Hazards ⚠️"
        createEntity={desc => handleCreateHazard(desc)}
      />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell />
              <TableCell>Active</TableCell>
              <TableCell />
              <TableCell>Pictogram</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {hazards &&
              pictograms &&
              Object.keys(hazards).map(hazardId => {
                const hazard = hazards[hazardId]
                return (
                  <TableRow key={hazardId}>
                    <TableCell component="th" scope="row">
                      {hazards[hazardId].desc}
                    </TableCell>
                    <TableCell>
                      <UpdateTitle
                        title={hazard.desc}
                        saveTitle={desc =>
                          handleUpdateHazardTitle(desc, hazardId)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        color="primary"
                        checked={hazard.active}
                        onChange={() => {
                          handleUpdateHazardActive(hazard.active, hazardId)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Delete
                        title="Hazard"
                        handleDelete={() => handleHazardDelete(hazardId)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {hazard.pictogram_src_url && (
                        <Avatar src={hazard.pictogram_src_url} />
                      )}
                    </TableCell>
                    <TableCell>
                      <AddPictogram
                        pictograms={pictograms}
                        entity={hazard}
                        handleAddPictogram={handleAddPictogram}
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
    hazards: state.hazards,
    pictograms: state.pictograms
  }),
  dispatch => ({
    updateHazard: fields => dispatch(updateHazard(fields)),
    deleteHazard: fields => dispatch(deleteHazard(fields)),
    fetchHazards: fields => dispatch(fetchHazards(fields)),
    fetchPictograms: fields => dispatch(fetchPictograms(fields)),
    createHazard: fields => dispatch(createHazard(fields))
  })
)(HazardsManage)
