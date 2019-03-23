import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { useTheme } from '@material-ui/styles'
import { GET_TOOLS } from './Queries'

const CREATE_TOOL = gql`
  mutation CreateTool($name: String!) {
    createTool(name: $name) {
      id
      name
      active
    }
  }
`
export default function CreateTool() {
  const [name, setName] = React.useState('')
  const theme = useTheme()
  function handleTitleUpdate(event) {
    setName(event.target.value)
  }
  return (
    <Mutation
      refetchQueries={[
        {
          query: GET_TOOLS
        }
      ]}
      mutation={CREATE_TOOL}
    >
      {(createTool, { data }) => (
        <Paper
          style={{
            marginBottom: theme.spacing.unit * 2,
            padding: theme.spacing.unit,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            background: theme.palette.primary.main
          }}
        >
          <Typography align="center" variant="h4">
            Tools{' '}
            <span aria-label="tool" role="img">
              ⚒️
            </span>
          </Typography>
          <div>
            <TextField
              autoComplete="off"
              autoFocus
              placeholder="New Tool..."
              id="standard-name"
              value={name}
              margin="dense"
              style={{ paddingLeft: theme.spacing.unit * 2, width: 320 }}
              onChange={handleTitleUpdate}
            />
            <Button
              variant="outlined"
              style={{ marginLeft: theme.spacing.unit * 2 }}
              onClick={() => {
                createTool({ variables: { name: name } })
                setName('')
              }}
            >
              Create
            </Button>
          </div>
        </Paper>
      )}
    </Mutation>
  )
}
