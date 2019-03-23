import React from 'react'
import { connect } from 'react-redux'
import { setSection } from '../../actions'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import { useTheme } from '@material-ui/styles'
import WorkCenterLink from './WorkCenterLink'

function Section({ sections, currentSection, setSection, sectionId }) {
  const section = sections[sectionId]
  const isCurrentSection = currentSection === sectionId
  const toggleSection = () => {
    isCurrentSection ? setSection(null) : setSection(sectionId)
  }
  const theme = useTheme()
  return (
    <>
      <ListItem
        button
        style={{
          borderTop: 'solid #e0e0e0 2px',
          paddingTop: theme.spacing.unit / 2.5,
          paddingBottom: theme.spacing.unit / 2.5,
          background: isCurrentSection && '#e0e0e0'
        }}
        onClick={toggleSection}
      >
        <ListItemText
          style={{
            paddingLeft: theme.spacing.unit
          }}
        >
          {section.display_name}
        </ListItemText>
      </ListItem>
      {isCurrentSection &&
        section.work_center_ids.map(workCenterId => (
          <WorkCenterLink key={workCenterId} workCenterId={workCenterId} />
        ))}
    </>
  )
}

export default connect(
  state => ({
    sections: state.sections,
    currentSection: state.currentSection
  }),
  dispatch => ({
    setSection: sectionId => dispatch(setSection(sectionId))
  })
)(Section)
