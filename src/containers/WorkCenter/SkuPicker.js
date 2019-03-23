import React from 'react'
import Chip from '@material-ui/core/Chip'
import { useTheme, makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { toggleAttribute } from '../../actions'
import { v4 } from 'uuid'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

function SkuPicker({
  selection,
  availableAttributes,
  attributeValues,
  attributeCategoryTypes,
  toggleAttribute,
  workCenterId
}) {
  const theme = useTheme()
  const useStyles = makeStyles({
    chip: {
      marginTop: theme.spacing.unit / 2,
      marginRight: theme.spacing.unit / 2,
      textTransform: 'capitalize'
    },
    lightTooltip: {
      background: theme.palette.common.white,
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[1],
      fontSize: 11
    },
    smallIcon: {
      fontSize: 20
    }
  })
  const classes = useStyles()

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {availableAttributes &&
        [6, 1, 2, 3, 4, 5].map(attributeCategoryId => {
          const available = availableAttributes[attributeCategoryId]
          const selected = selection[attributeCategoryId]
          const availableMinusSelected = available
            .filter(val => !selected.includes(val))
            .sort()
          return (
            <Grid item xs={4} sm={2} key={attributeCategoryId}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Typography
                  className={classes.chip}
                  variant="h6"
                  align="center"
                >
                  {attributeCategoryTypes[attributeCategoryId]}
                </Typography>
                {selected.map(attrib => (
                  <Tooltip placement="top" title={attrib} key={v4()}>
                    <Chip
                      label={attributeValues[attributeCategoryId][attrib]}
                      className={classes.chip}
                      onClick={() =>
                        toggleAttribute(
                          attributeCategoryId,
                          attrib,
                          workCenterId
                        )
                      }
                    />
                  </Tooltip>
                ))}
                {availableMinusSelected.map(attrib => (
                  <Tooltip placement="top" title={attrib} key={v4()}>
                    <Chip
                      label={attributeValues[attributeCategoryId][attrib]}
                      className={classes.chip}
                      variant="outlined"
                      onClick={() =>
                        toggleAttribute(
                          attributeCategoryId,
                          attrib,
                          workCenterId
                        )
                      }
                    />
                  </Tooltip>
                ))}
              </Grid>
            </Grid>
          )
        })}
    </Grid>
  )
}

export default connect(
  state => ({
    selection: state.selection,
    availableAttributes: state.availableAttributes,
    attributeValues: state.attributeValues,
    attributeCategoryTypes: state.attributeCategoryTypes
  }),
  dispatch => ({
    toggleAttribute: (attributeCategoryId, attrib, workCenterId) =>
      dispatch(toggleAttribute(attributeCategoryId, attrib, workCenterId))
  })
)(SkuPicker)
