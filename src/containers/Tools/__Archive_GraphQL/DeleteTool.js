import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import Delete from '../../components/Delete'

const DELETE_TOOL = gql`
  mutation DeleteTool($id: ID!) {
    deleteTool(id: $id) {
      id
    }
  }
`
const DeleteTool = ({ toolId }) => {
  return (
    <Mutation
      refetchQueries={[
        {
          query: gql`
            query UpdateCache {
              tools {
                id
                name
              }
            }
          `
        }
      ]}
      mutation={DELETE_TOOL}
    >
      {(deleteTool, { data }) => (
        <Delete
          title="Tool"
          handleDelete={() => deleteTool({ variables: { id: toolId } })}
        />
      )}
    </Mutation>
  )
}

export default DeleteTool
