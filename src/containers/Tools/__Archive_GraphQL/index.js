import React from 'react'
import ToolTable from './ToolTable'
import CreateTool from './CreateTool'
import Paper from '@material-ui/core/Paper'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
const client = new ApolloClient({ uri: 'http://10.0.0.167:4000' })

export default function ToolsManage() {
  return (
    <ApolloProvider client={client}>
      <CreateTool />
      <Paper>
        <ToolTable />
      </Paper>
    </ApolloProvider>
  )
}
