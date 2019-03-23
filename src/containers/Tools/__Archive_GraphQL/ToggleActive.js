import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import Switch from '@material-ui/core/Switch'

const UPDATE_TOOL = gql`
  mutation UpdateTool($id: ID!, $active: Boolean) {
    updateTool(id: $id, active: $active) {
      id
      active
    }
  }
`
export default function UpdateTool({ tool }) {
  return (
    <Mutation mutation={UPDATE_TOOL}>
      {(updateTool, { loading, error, data }) => {
        if (error) return `Error! ${error.message}`
        return (
          <Switch
            color="primary"
            checked={tool.active}
            onChange={() => {
              updateTool({ variables: { id: tool.id, active: !tool.active } })
            }}
          />
        )
      }}
    </Mutation>
  )
}
