import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Avatar from '@material-ui/core/Avatar'
import DeleteTool from './DeleteTool'
import UpdateTool from './UpdateTool'
import ToggleActive from './ToggleActive'
import AddPictogram from './AddPictogram'

export default tool => {
  return (
    <TableRow key={tool.id}>
      <TableCell component="th" scope="row">
        {tool.name}
      </TableCell>
      <TableCell>
        <UpdateTool tool={tool} />
      </TableCell>
      <TableCell>
        <ToggleActive tool={tool} />
      </TableCell>
      <TableCell>
        <DeleteTool toolId={tool.id} />
      </TableCell>
      <TableCell component="th" scope="row">
        {tool.pictogram && (
          <Avatar src={tool.pictogram.url} key={tool.pictogram.id} />
        )}
      </TableCell>
      <TableCell>
        <AddPictogram tool={tool} />
      </TableCell>
    </TableRow>
  )
}
