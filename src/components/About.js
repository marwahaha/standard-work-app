import React from 'react'
import CropDinIcon from '@material-ui/icons/CropDin'
import FormatLineSpacingIcon from '@material-ui/icons/FormatLineSpacing'
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify'
import DomainIcon from '@material-ui/icons/Domain'
import LinearScaleIcon from '@material-ui/icons/LinearScale'
import RoomIcon from '@material-ui/icons/Room'
import PeopleIcon from '@material-ui/icons/People'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles, useTheme } from '@material-ui/styles'

const descriptions = [
  {
    icon: <RoomIcon />,
    title: 'Location',
    body: 'The top level area with in the plant.'
  },
  {
    icon: <PeopleIcon />,
    title: 'Line',
    body: 'A collection of Sections within a Location.'
  },
  {
    icon: <LinearScaleIcon />,
    title: 'Section',
    body: 'A collection of Work Centers within a Line.'
  },
  {
    icon: <DomainIcon />,
    title: 'Work Center',
    body:
      'A physical place where work happens. Given a particular SKU, there will be one or zero SWBs that apply to it within the Work Center.'
  },
  {
    icon: <FormatAlignJustifyIcon />,
    title: 'Standard Work Book (SWB)',
    body:
      'A collection of ordered JESs. The SWB exists within a Work Center. The SWB has mower attributes applied to it that are non-conflicting to other attributes.'
  },
  {
    icon: <FormatLineSpacingIcon />,
    title: 'Job Element Sheet (JES)',
    body:
      'A collection of ordered Elements. A JES exists within a SWB. A JES has a title. A JES may contain multiple Branches - or JESs that are dependant on mower attributes. For example a JES called "Install Deck Scalp Wheels" may have two branches within it - one that is for 52" decks and another for 61" decks. The elements within those branches are specific to the 52" and 61" decks, given the additional attributes that may be selected at the SWB level.'
  },
  {
    icon: <CropDinIcon />,
    title: 'Element',
    body:
      'The most granular definition of work. It must at least contain a title, but may also contain an image, ammount of time to complete element, and other attributes related to safty, quality, tools, and components needed.'
  }
]

export default function About() {
  const theme = useTheme()
  const useStyles = makeStyles({
    paper: {
      padding: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 2
    }
  })
  const classes = useStyles()

  return (
    <>
      <Typography
        align="center"
        style={{ marginBottom: theme.spacing.unit }}
        variant="h5"
      >
        About
      </Typography>
      {descriptions.map(({ title, body, icon }) => (
        <Paper key={title} className={classes.paper}>
          {icon}
          <br />
          <Typography style={{ display: 'inline' }} variant="h6">
            {title}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </Paper>
      ))}
    </>
  )
}
