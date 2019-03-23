import React, { useState, useEffect } from 'react'
import Sequencing from './Sequencing'
import { connect } from 'react-redux'
import {
  fetchSwb,
  fetchSkus,
  toggleAllBranches,
  moveBranch
} from '../../actions'
import CreateBranch from './CreateBranch'
import ActionButton from '../../components/ActionButton'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { NavLink } from 'react-router-dom'
import { useTheme, makeStyles } from '@material-ui/styles'
import Cookies from 'js-cookie'
import ElementVisabilityFilters from './ElementVisabilityFilters'

const links = [
  {
    link: '/tools',
    title: 'Tools'
  },
  {
    link: '/hazards',
    title: 'Hazards'
  },
  {
    link: '/critical-to-quality',
    title: 'Critical To Quality'
  },
  {
    link: '/critical-to-quality-type',
    title: 'Critical To Quality Types'
  },
  {
    link: '/critical-to-quality-standards',
    title: 'Critical To Quality Standards'
  },
  {
    link: '/work-tags',
    title: 'Work Tags'
  },
  {
    link: '/work-tag-types',
    title: 'Work Tag Types'
  }
]

function SwbComp({
  fetchSwb,
  moveBranch,
  match,
  toggleAllBranches,
  branchesOpen
}) {
  const [createJesOpen, setCreateJesOpen] = useState(false)
  const [moveBranchId, setMoveBranchId] = useState('')
  const [userId, setUserId] = useState('')
  const theme = useTheme()

  const useStyles = makeStyles({
    button: {
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    }
  })

  const classes = useStyles()

  const fetchData = () => {
    fetchSwb({
      data_source: 'standard_work',
      request_type: 'get_hier_sw_data_by_swb_assc_id',
      asam_id: match.params.swb,
      convert_boolean_fields: 'yes',
      convert_ids_to_string: 'yes'
    })
  }

  useEffect(() => {
    document.title = 'Standard Work Book'
    fetchData()
    const initialUserId = Cookies.get('wrightnet_user_token')
    if (initialUserId) {
      setUserId(initialUserId)
    }
  }, [match.params.swb])

  const handeMoveBranch = () => {
    moveBranch({
      data_source: 'standard_work',
      request_type: 'move_branch_diff_swb',
      asab_id: moveBranchId,
      asam_id: match.params.swb
    })
  }

  const handleBranchIdChange = ({ target }) => {
    setMoveBranchId(target.value)
  }

  const swbId = match.params.swb
  return (
    <>
      <ElementVisabilityFilters />
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => toggleAllBranches(true)}
      >
        {branchesOpen ? (
          <>
            <UnfoldLessIcon />
          </>
        ) : (
          <>
            <UnfoldMoreIcon />
          </>
        )}
      </Button>

      <Typography style={{ marginRight: theme.spacing.unit }} inline>
        Move JES:
      </Typography>

      <TextField
        autoComplete="off"
        value={moveBranchId}
        onChange={handleBranchIdChange}
        margin="dense"
        placeholder="Paste JES Id Here"
      />

      {moveBranchId && (
        <Button onClick={() => handeMoveBranch()}>Move Branch</Button>
      )}
      {userId &&
        links.map(({ link, title }) => (
          <Button
            key={link}
            className={classes.button}
            variant="contained"
            component={NavLink}
            to={link}
          >
            {title}
          </Button>
        ))}

      <Sequencing />
      <CreateBranch
        swbId={swbId}
        handleClose={() => setCreateJesOpen(!createJesOpen)}
        open={createJesOpen}
      />
      <ActionButton
        toolTip="Add JES"
        actionFunction={() => setCreateJesOpen(true)}
      />
    </>
  )
}

const Swb = connect(
  state => ({
    attributeValues: state.attributeValues,
    branchesOpen: state.branchesOpen,
    currentSwb: state.currentSwb
  }),
  dispatch => ({
    fetchSwb: fields => dispatch(fetchSwb(fields)),
    fetchSkus: fields => dispatch(fetchSkus(fields)),
    moveBranch: fields => dispatch(moveBranch(fields)),
    toggleAllBranches: isOpen => dispatch(toggleAllBranches(isOpen))
  })
)(SwbComp)

export default Swb
