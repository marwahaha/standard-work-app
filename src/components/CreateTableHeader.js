import React from 'react'
import { useTheme } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function CreateTableHeader({ createEntity, title }) {
  const theme = useTheme()
  const [name, setName] = React.useState('')

  function handleTitleUpdate(event) {
    setName(event.target.value)
  }

  return (
    <Paper
      style={{
        marginBottom: theme.spacing.unit * 2,
        padding: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        background: theme.palette.primary.main
      }}
    >
      <Typography align="center" variant="h4">
        <span aria-label="titleEMOJI" role="img">
          {title}
        </span>
      </Typography>
      <div>
        <TextField
          autoComplete="off"
          autoFocus
          placeholder="New..."
          id="standard-name"
          value={name}
          margin="dense"
          style={{ paddingLeft: theme.spacing.unit * 2, width: 320 }}
          onChange={handleTitleUpdate}
        />
        <Button
          variant="outlined"
          disabled={!name}
          style={{ marginLeft: theme.spacing.unit * 2 }}
          onClick={() => {
            createEntity(name)
            setName('')
          }}
        >
          Create
        </Button>
      </div>
    </Paper>
  )
}
