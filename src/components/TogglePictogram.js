import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import { useTheme } from '@material-ui/styles'

export default ({ entity, pictogram, handleAddPictogram }) => {
  const theme = useTheme()
  return (
    <MenuItem
      selected={Boolean(
        entity.pictogram_id && entity.pictogram_id === pictogram.dpl_id
      )}
      onClick={() => handleAddPictogram(pictogram.dpl_id, entity.id)}
    >
      <Avatar src={pictogram.pictogram_src_url} />
      <Typography style={{ marginLeft: theme.spacing.unit }}>
        {pictogram.dpl_pictogram_name}
      </Typography>
    </MenuItem>
  )
}
