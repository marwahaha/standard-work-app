import React, { useState } from 'react'
import FilterIcon from '@material-ui/icons/Filter'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Modal from '@material-ui/core/Modal'
import ModalPaper from '../../components/ModalPaper'
import { makeStyles, useTheme } from '@material-ui/styles'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import TogglePictogram from './TogglePictogram'

const GET_PICTOGRAMS = gql`
  {
    pictograms {
      id
      url
      name
    }
  }
`

export default ({ tool }) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const useStyles = makeStyles({
    smallIcon: {
      fontSize: 20
    },
    paper: {
      padding: theme.spacing.unit
    }
  })

  const classes = useStyles()

  return (
    <>
      <Tooltip disableFocusListener title="Pick Pictogram">
        <IconButton onClick={() => setOpen(!open)}>
          <FilterIcon className={classes.smallIcon} />
        </IconButton>
      </Tooltip>
      <Modal open={open}>
        <ModalPaper title="Pick Pictogram" closeFunction={() => setOpen(false)}>
          <Query asyncMode query={GET_PICTOGRAMS}>
            {({ data, loading, error }) => {
              if (loading) return null
              if (error) return <div>Error {error.message}</div>
              return (
                <div>
                  {data.pictograms.map(pictogram => (
                    <TogglePictogram
                      key={pictogram.id}
                      tool={tool}
                      pictogram={pictogram}
                    />
                  ))}
                </div>
              )
            }}
          </Query>
        </ModalPaper>
      </Modal>
    </>
  )
}
