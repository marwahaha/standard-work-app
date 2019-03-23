import React from 'react'
import { connect } from 'react-redux'
import { setLine } from '../../actions'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import { useTheme } from '@material-ui/styles'
import Section from './Section'

function Line({ setLine, lines, lineId, currentLine }) {
  const line = lines[lineId]
  const isCurrentLine = currentLine === lineId
  const toggleLine = () => {
    isCurrentLine ? setLine(null) : setLine(lineId)
  }
  const theme = useTheme()
  return (
    <>
      <ListItem
        button
        style={{
          paddingTop: theme.spacing.unit / 1.75,
          paddingBottom: theme.spacing.unit / 1.75,
          paddingLeft: 10,
          background: lineId === currentLine && theme.palette.primary.main
        }}
        onClick={toggleLine}
      >
        <ListItemText>{line.display_name}</ListItemText>
      </ListItem>
      {isCurrentLine &&
        line.section_ids.map(sectionId => (
          <Section key={sectionId} sectionId={sectionId} />
        ))}
    </>
  )
}

export default connect(
  state => ({
    lines: state.lines,
    currentLine: state.currentLine
  }),
  dispatch => ({
    setLine: lineId => dispatch(setLine(lineId))
  })
)(Line)
