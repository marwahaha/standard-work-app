import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { useTheme } from '@material-ui/styles'

const UPDATE_TOOL = gql`
  mutation UpdateTool($id: ID!, $pictogramId: ID!) {
    updateTool(id: $id, pictogramId: $pictogramId) {
      id
      pictogram {
        id
        url
      }
    }
  }
`

export default ({ tool, pictogram }) => {
  const theme = useTheme()
  return (
    <Mutation
      refetchQueries={[
        {
          query: gql`
            query UpdateCache {
              tools {
                id
                pictogram {
                  id
                  url
                }
              }
            }
          `
        }
      ]}
      mutation={UPDATE_TOOL}
    >
      {(updateTool, { data, loading, error }) => (
        <MenuItem
          selected={tool.pictogram && tool.pictogram.id === pictogram.id}
          onClick={() =>
            updateTool({
              variables: { id: tool.id, pictogramId: pictogram.id }
            })
          }
        >
          <Avatar src={pictogram.url} />
          <Typography style={{ marginLeft: theme.spacing.unit }}>
            {pictogram.name}
          </Typography>
        </MenuItem>
      )}
    </Mutation>
  )
}
