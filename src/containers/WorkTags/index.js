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
import SelectTagType from './SelectTagType'
import {
  updateWorkTag,
  fetchWorkTags,
  createWorkTag,
  fetchWorkTagTypes,
  deleteWorkTag
} from '../../actions'
import CreateTableHeader from '../../components/CreateTableHeader'
import Delete from '../../components/Delete'

function WorkTagManage({
  workTags,
  updateWorkTag,
  fetchWorkTags,
  createWorkTag,
  fetchWorkTagTypes,
  workTagTypes,
  deleteWorkTag
}) {
  const fetchData = async () => {
    document.title = 'Work Tags'
    await fetchWorkTags({
      data_source: 'standard_work',
      request_type: 'get_all_work_tag_data',
      convert_boolean_fields: 'yes',
      convert_ids_to_string: 'yes'
    })
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

  const handleDeleteWorkTag = id => {
    deleteWorkTag({
      data_source: 'standard_work',
      request_type: 'delete_work_tag_definition',
      definition_id: id
    })
  }

  const handleCreateWorkTag = name => {
    createWorkTag({
      data_source: 'standard_work',
      request_type: 'add_work_tag_def',
      managed_item_arr: {
        name: name,
        tag_type_id: 1
      }
    })
  }

  const handleUpdateWorkTagType = (tagTypeId, workTagId) => {
    updateWorkTag({
      data_source: 'standard_work',
      request_type: 'update_work_tag_def',
      managed_item_arr: {
        tag_type_id: tagTypeId
      },
      def_id: workTagId
    })
  }

  const handleUpdateWorkTagTitle = (name, workTagId) => {
    updateWorkTag({
      data_source: 'standard_work',
      request_type: 'update_work_tag_def',
      managed_item_arr: {
        name: name
      },
      def_id: workTagId
    })
  }
  const handleUpdateWorkTagActive = (active, workTagId) => {
    updateWorkTag({
      data_source: 'standard_work',
      request_type: 'update_work_tag_def',
      managed_item_arr: {
        active: !active
      },
      def_id: workTagId
    })
  }
  return (
    <>
      <CreateTableHeader
        title="Work Tags 👷🏼‍"
        createEntity={name => handleCreateWorkTag(name)}
      />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell />
              <TableCell>Active</TableCell>
              <TableCell>Tag Type</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {workTags &&
              workTagTypes &&
              Object.keys(workTags).map(id => {
                const workTag = workTags[id]
                return (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {workTags[id].name}
                    </TableCell>
                    <TableCell>
                      <UpdateTitle
                        title={workTag.name}
                        saveTitle={name => handleUpdateWorkTagTitle(name, id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        color="primary"
                        checked={workTag.active}
                        onChange={() => {
                          handleUpdateWorkTagActive(workTag.active, id)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <SelectTagType
                        workTag={workTag}
                        allWorkTagTypes={workTagTypes}
                        saveWorkTagType={tagTypeId =>
                          handleUpdateWorkTagType(tagTypeId, id)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Delete
                        title="Work Tag"
                        handleDelete={() => handleDeleteWorkTag(id)}
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
    workTags: state.workTags,
    workTagTypes: state.workTagTypes
  }),
  dispatch => ({
    updateWorkTag: fields => dispatch(updateWorkTag(fields)),
    fetchWorkTags: fields => dispatch(fetchWorkTags(fields)),
    fetchWorkTagTypes: fields => dispatch(fetchWorkTagTypes(fields)),
    deleteWorkTag: fields => dispatch(deleteWorkTag(fields)),
    createWorkTag: fields => dispatch(createWorkTag(fields))
  })
)(WorkTagManage)
