import React from 'react'
import { Query } from 'react-apollo'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Tool from './Tool'
import Typography from '@material-ui/core/Typography'

import { GET_TOOLS } from './Queries'

export default function Tools() {
  return (
    <Query asyncMode query={GET_TOOLS}>
      {({ loading, error, data }) => {
        if (loading) return null // <Typography>Loading...</Typography>
        if (error) return <Typography>{`Error! ${error.message}`}</Typography>
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                {/* Edit Title */}
                <TableCell />
                <TableCell>Active</TableCell>
                {/* Delete Button */}
                <TableCell />
                <TableCell>Pictogram</TableCell>
                {/* Edit Pictogram */}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.tools.map(tool => (
                <Tool key={tool.id} {...tool} />
              ))}
            </TableBody>
          </Table>
        )
      }}
    </Query>
  )
}
