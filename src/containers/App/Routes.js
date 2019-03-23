import React from 'react'
import { Route } from 'react-router-dom'
import Swb from '../Swb/index'
import WorkCenter from '../WorkCenter/index'
import About from '../../components/About'
import Tools from '../Tools'
import Hazards from '../Hazards'
import WorkTags from '../WorkTags'
import CriticalToQuality from '../CriticalToQuality'
import CriticalToQualityType from '../CriticalToQualityType'
import CriticalToQualityStandard from '../CriticalToQualityStandard'
import WorkTagType from '../WorkTagType'

export default () => {
  return (
    <>
      <Route exact path="/" component={About} />
      <Route exact path="/tools" component={Tools} />
      <Route exact path="/hazards" component={Hazards} />
      <Route exact path="/work-tags" component={WorkTags} />
      <Route exact path="/critical-to-quality" component={CriticalToQuality} />
      <Route
        exact
        path="/critical-to-quality-type"
        component={CriticalToQualityType}
      />
      <Route
        exact
        path="/critical-to-quality-standards"
        component={CriticalToQualityStandard}
      />
      <Route exact path="/work-tag-types" component={WorkTagType} />
      <Route exact path="/work-center/:workcenter" component={WorkCenter} />
      <Route exact path="/swb/:swb" component={Swb} />
    </>
  )
}
