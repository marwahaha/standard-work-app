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
import Delete from '../../components/Delete'
import {
  updateTool,
  fetchTools,
  createTool,
  deleteTool,
  fetchPictograms
} from '../../actions'
import AddPictogram from '../../components/AddPictogram'
import CreateTableHeader from '../../components/CreateTableHeader'
function ToolsManage({
  tools,
  updateTool,
  fetchTools,
  createTool,
  deleteTool,
  pictograms,
  fetchPictograms
}) {
  const fetchData = async () => {
    document.title = 'Tools'
    await fetchTools({
      data_source: 'standard_work',
      request_type: 'get_all_tool_data',
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

  const handleCreateTool = name => {
    createTool({
      data_source: 'standard_work',
      request_type: 'add_tool_def',
      managed_item_arr: {
        name: name,
        desc: ''
      }
    })
  }

  //DETETe TOOL
  const handleToolDelete = id => {
    console.log(id)
    deleteTool({
      data_source: 'standard_work',
      request_type: 'delete_tool_definition',
      definition_id: id
    })
  }
  const handleUpdateToolTitle = (name, id) => {
    updateTool({
      data_source: 'standard_work',
      request_type: 'update_tool_def',
      managed_item_arr: {
        name: name
      },
      def_id: id
    })
  }
  const handleUpdateToolActive = (active, id) => {
    updateTool({
      data_source: 'standard_work',
      request_type: 'update_tool_def',
      managed_item_arr: {
        active: !active
      },
      def_id: id
    })
  }
  const handleAddPictogram = (pictogramId, id) => {
    updateTool({
      data_source: 'standard_work',
      request_type: 'update_tool_def',
      managed_item_arr: {
        pictogram_id: pictogramId
      },
      def_id: id
    })
  }
  return (
    <>
      <CreateTableHeader
        title="Tools ⚒️"
        createEntity={name => handleCreateTool(name)}
      />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell />
              <TableCell>Active</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Pictogram</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tools &&
              pictograms &&
              Object.keys(tools).map(id => {
                const tool = tools[id]
                return (
                  <TableRow key={id}>
                    <TableCell>{tools[id].name}</TableCell>
                    <TableCell>
                      <UpdateTitle
                        title={tool.name}
                        saveTitle={name => handleUpdateToolTitle(name, id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        color="primary"
                        checked={tool.active}
                        onChange={() => {
                          handleUpdateToolActive(tool.active, id)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Delete
                        title="Tool"
                        handleDelete={() => handleToolDelete(id)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {tool.pictogram_src_url && (
                        <Avatar src={tool.pictogram_src_url} />
                      )}
                    </TableCell>
                    <TableCell>
                      <AddPictogram
                        pictograms={pictograms}
                        entity={tool}
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
    tools: state.tools,
    pictograms: state.pictograms
  }),
  dispatch => ({
    updateTool: fields => dispatch(updateTool(fields)),
    deleteTool: fields => {
      console.log(fields)
      return dispatch(deleteTool(fields))
    },
    fetchTools: fields => dispatch(fetchTools(fields)),
    fetchPictograms: fields => dispatch(fetchPictograms(fields)),
    createTool: fields => dispatch(createTool(fields))
  })
)(ToolsManage)
