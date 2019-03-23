import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import UpdateTitle from '../../components/UpdateTitle'

const UPDATE_TOOL = gql`
  mutation UpdateTool($id: ID!, $name: String) {
    updateTool(id: $id, name: $name) {
      id
      name
    }
  }
`
export default function UpdateTool({ tool }) {
  return (
    <Mutation mutation={UPDATE_TOOL}>
      {(updateTool, { loading, error, data }) => {
        if (error) return `Error! ${error.message}`
        return (
          <UpdateTitle
            title={tool.name}
            saveTitle={name =>
              updateTool({ variables: { id: tool.id, name: name } })
            }
          />
        )
      }}
    </Mutation>
  )
}
